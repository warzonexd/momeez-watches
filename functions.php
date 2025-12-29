<?php
/**
 * Momeez Watches WordPress Theme Functions
 * Custom functions for product management and theme setup
 */

// Theme Setup
add_action('after_setup_theme', 'momeez_theme_setup');
function momeez_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    // Register menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'momeez'),
        'footer' => __('Footer Menu', 'momeez'),
    ));
}

// Register Custom Post Type for Products
add_action('init', 'register_momeez_product_post_type');
function register_momeez_product_post_type() {
    $args = array(
        'label' => __('Products', 'momeez'),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'menu_icon' => 'dashicons-cart',
        'rewrite' => array('slug' => 'products'),
    );
    register_post_type('momeez_product', $args);
}

// Register Custom Taxonomy for Categories
add_action('init', 'register_momeez_category_taxonomy');
function register_momeez_category_taxonomy() {
    $args = array(
        'label' => __('Product Categories', 'momeez'),
        'public' => true,
        'hierarchical' => true,
        'rewrite' => array('slug' => 'product-category'),
    );
    register_taxonomy('momeez_category', 'momeez_product', $args);
}

// Add Custom Meta Boxes for Product Details
add_action('add_meta_boxes', 'add_momeez_product_meta_boxes');
function add_momeez_product_meta_boxes() {
    add_meta_box(
        'momeez_product_details',
        __('Product Details', 'momeez'),
        'render_momeez_product_details_meta_box',
        'momeez_product',
        'normal',
        'high'
    );
    
    add_meta_box(
        'momeez_product_images',
        __('Product Images', 'momeez'),
        'render_momeez_product_images_meta_box',
        'momeez_product',
        'normal',
        'high'
    );
}

// Render Product Details Meta Box
function render_momeez_product_details_meta_box($post) {
    wp_nonce_field('momeez_product_nonce', 'momeez_product_nonce');
    
    $product_code = get_post_meta($post->ID, '_product_code', true);
    $price = get_post_meta($post->ID, '_price', true);
    $original_price = get_post_meta($post->ID, '_original_price', true);
    $name_ar = get_post_meta($post->ID, '_name_ar', true);
    $description_ar = get_post_meta($post->ID, '_description_ar', true);
    $rating = get_post_meta($post->ID, '_rating', true) ?: 5;
    ?>
    <div style="padding: 10px;">
        <p>
            <label for="product_code"><?php _e('Product Code:', 'momeez'); ?></label>
            <input type="text" id="product_code" name="product_code" value="<?php echo esc_attr($product_code); ?>" style="width: 100%; padding: 5px;">
        </p>
        
        <p>
            <label for="price"><?php _e('Price:', 'momeez'); ?></label>
            <input type="number" id="price" name="price" value="<?php echo esc_attr($price); ?>" style="width: 100%; padding: 5px;">
        </p>
        
        <p>
            <label for="original_price"><?php _e('Original Price (optional):', 'momeez'); ?></label>
            <input type="number" id="original_price" name="original_price" value="<?php echo esc_attr($original_price); ?>" style="width: 100%; padding: 5px;">
        </p>
        
        <p>
            <label for="name_ar"><?php _e('Name (Arabic):', 'momeez'); ?></label>
            <input type="text" id="name_ar" name="name_ar" value="<?php echo esc_attr($name_ar); ?>" style="width: 100%; padding: 5px;">
        </p>
        
        <p>
            <label for="description_ar"><?php _e('Description (Arabic):', 'momeez'); ?></label>
            <textarea id="description_ar" name="description_ar" style="width: 100%; padding: 5px; height: 100px;"><?php echo esc_textarea($description_ar); ?></textarea>
        </p>
        
        <p>
            <label for="rating"><?php _e('Rating (1-5):', 'momeez'); ?></label>
            <input type="number" id="rating" name="rating" min="1" max="5" value="<?php echo esc_attr($rating); ?>" style="width: 100%; padding: 5px;">
        </p>
    </div>
    <?php
}

// Render Product Images Meta Box
function render_momeez_product_images_meta_box($post) {
    $images = get_post_meta($post->ID, '_product_images', true) ?: array();
    ?>
    <div style="padding: 10px;">
        <p>
            <button type="button" class="button button-primary" id="add_product_image">
                <?php _e('Add Image', 'momeez'); ?>
            </button>
        </p>
        
        <div id="product_images_container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; margin-top: 10px;">
            <?php foreach ($images as $index => $image_url): ?>
                <div style="position: relative; border: 1px solid #ddd; padding: 5px; border-radius: 4px;">
                    <img src="<?php echo esc_url($image_url); ?>" style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px;">
                    <button type="button" class="button button-small button-link-delete remove_image" data-index="<?php echo esc_attr($index); ?>" style="position: absolute; top: 5px; right: 5px;">×</button>
                    <input type="hidden" name="product_images[]" value="<?php echo esc_attr($image_url); ?>">
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    
    <script>
    jQuery(document).ready(function($) {
        $('#add_product_image').on('click', function() {
            var frame = wp.media({
                title: '<?php _e('Select Product Image', 'momeez'); ?>',
                button: { text: '<?php _e('Select', 'momeez'); ?>' },
                multiple: true
            });
            
            frame.on('select', function() {
                var attachments = frame.state().get('selection').toJSON();
                attachments.forEach(function(attachment) {
                    var html = '<div style="position: relative; border: 1px solid #ddd; padding: 5px; border-radius: 4px;">' +
                        '<img src="' + attachment.url + '" style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px;">' +
                        '<button type="button" class="button button-small button-link-delete remove_image" style="position: absolute; top: 5px; right: 5px;">×</button>' +
                        '<input type="hidden" name="product_images[]" value="' + attachment.url + '">' +
                        '</div>';
                    $('#product_images_container').append(html);
                });
            });
            
            frame.open();
        });
        
        $(document).on('click', '.remove_image', function() {
            $(this).closest('div').remove();
        });
    });
    </script>
    <?php
}

// Save Product Meta Data
add_action('save_post_momeez_product', 'save_momeez_product_meta');
function save_momeez_product_meta($post_id) {
    if (!isset($_POST['momeez_product_nonce']) || !wp_verify_nonce($_POST['momeez_product_nonce'], 'momeez_product_nonce')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (isset($_POST['product_code'])) {
        update_post_meta($post_id, '_product_code', sanitize_text_field($_POST['product_code']));
    }
    
    if (isset($_POST['price'])) {
        update_post_meta($post_id, '_price', intval($_POST['price']));
    }
    
    if (isset($_POST['original_price'])) {
        update_post_meta($post_id, '_original_price', intval($_POST['original_price']));
    }
    
    if (isset($_POST['name_ar'])) {
        update_post_meta($post_id, '_name_ar', sanitize_text_field($_POST['name_ar']));
    }
    
    if (isset($_POST['description_ar'])) {
        update_post_meta($post_id, '_description_ar', sanitize_textarea_field($_POST['description_ar']));
    }
    
    if (isset($_POST['rating'])) {
        update_post_meta($post_id, '_rating', intval($_POST['rating']));
    }
    
    if (isset($_POST['product_images'])) {
        $images = array_map('esc_url_raw', $_POST['product_images']);
        update_post_meta($post_id, '_product_images', $images);
    }
}

// Enqueue Styles and Scripts
add_action('wp_enqueue_scripts', 'momeez_enqueue_assets');
function momeez_enqueue_assets() {
    wp_enqueue_style('momeez-style', get_stylesheet_uri());
    wp_enqueue_script('momeez-script', get_template_directory_uri() . '/js/script.js', array('jquery'), '1.0', true);
}

// Add Admin Enqueue Scripts
add_action('admin_enqueue_scripts', 'momeez_admin_enqueue_assets');
function momeez_admin_enqueue_assets() {
    wp_enqueue_media();
}

// Custom Widget: Recent Products
class Momeez_Recent_Products_Widget extends WP_Widget {
    public function __construct() {
        parent::__construct('momeez_recent_products', __('Recent Products', 'momeez'));
    }
    
    public function widget($args, $instance) {
        echo $args['before_widget'];
        echo $args['before_title'] . __('Recent Products', 'momeez') . $args['after_title'];
        
        $products = get_posts(array(
            'post_type' => 'momeez_product',
            'posts_per_page' => 5,
            'orderby' => 'date',
            'order' => 'DESC',
        ));
        
        echo '<ul>';
        foreach ($products as $product) {
            echo '<li><a href="' . get_permalink($product->ID) . '">' . $product->post_title . '</a></li>';
        }
        echo '</ul>';
        
        echo $args['after_widget'];
    }
}

add_action('widgets_init', function() {
    register_widget('Momeez_Recent_Products_Widget');
});

// Shortcode: Display Products
add_shortcode('momeez_products', 'momeez_products_shortcode');
function momeez_products_shortcode($atts) {
    $atts = shortcode_atts(array(
        'category' => '',
        'limit' => 12,
    ), $atts);
    
    $args = array(
        'post_type' => 'momeez_product',
        'posts_per_page' => $atts['limit'],
    );
    
    if ($atts['category']) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'momeez_category',
                'field' => 'slug',
                'terms' => $atts['category'],
            ),
        );
    }
    
    $products = get_posts($args);
    
    ob_start();
    ?>
    <div class="momeez-products-grid">
        <?php foreach ($products as $product): ?>
            <div class="momeez-product-card">
                <?php if (has_post_thumbnail($product->ID)): ?>
                    <div class="product-image">
                        <?php echo get_the_post_thumbnail($product->ID, 'medium'); ?>
                    </div>
                <?php endif; ?>
                
                <div class="product-info">
                    <h3><?php echo $product->post_title; ?></h3>
                    <p class="product-price">
                        <?php 
                        $price = get_post_meta($product->ID, '_price', true);
                        $original_price = get_post_meta($product->ID, '_original_price', true);
                        
                        if ($original_price) {
                            echo '<span class="original-price">$' . $original_price . '</span>';
                        }
                        echo '$' . $price;
                        ?>
                    </p>
                    <a href="<?php echo get_permalink($product->ID); ?>" class="button">
                        <?php _e('View Details', 'momeez'); ?>
                    </a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <?php
    return ob_get_clean();
}
