<?php
/**
 * Single product template for Momeez Watches Theme
 */

get_header();
?>

<main class="site-main">
    <div class="container">
        <?php
        while (have_posts()) {
            the_post();
            ?>
            <article class="product-single">
                <div class="product-gallery">
                    <?php
                    $images = get_post_meta(get_the_ID(), '_product_images', true);
                    if ($images && is_array($images)) {
                        ?>
                        <div class="gallery-main">
                            <img src="<?php echo esc_url($images[0]); ?>" alt="<?php the_title(); ?>" id="main-image">
                        </div>
                        
                        <?php if (count($images) > 1) { ?>
                            <div class="gallery-thumbnails">
                                <?php foreach ($images as $index => $image_url) { ?>
                                    <img src="<?php echo esc_url($image_url); ?>" alt="<?php the_title(); ?>" class="thumbnail" data-full="<?php echo esc_url($image_url); ?>" onclick="document.getElementById('main-image').src = this.dataset.full;">
                                <?php } ?>
                            </div>
                        <?php } ?>
                        <?php
                    } elseif (has_post_thumbnail()) {
                        the_post_thumbnail('large');
                    }
                    ?>
                </div>
                
                <div class="product-details">
                    <h1><?php the_title(); ?></h1>
                    
                    <?php
                    $name_ar = get_post_meta(get_the_ID(), '_name_ar', true);
                    if ($name_ar) {
                        echo '<p class="product-name-ar">' . esc_html($name_ar) . '</p>';
                    }
                    ?>
                    
                    <?php
                    $product_code = get_post_meta(get_the_ID(), '_product_code', true);
                    if ($product_code) {
                        echo '<p class="product-code">' . __('Product Code:', 'momeez') . ' <strong>' . esc_html($product_code) . '</strong></p>';
                    }
                    ?>
                    
                    <div class="product-price">
                        <?php
                        $price = get_post_meta(get_the_ID(), '_price', true);
                        $original_price = get_post_meta(get_the_ID(), '_original_price', true);
                        
                        if ($original_price) {
                            echo '<span class="original-price">$' . esc_html($original_price) . '</span>';
                        }
                        echo '<span class="current-price">$' . esc_html($price) . '</span>';
                        ?>
                    </div>
                    
                    <?php
                    $rating = get_post_meta(get_the_ID(), '_rating', true) ?: 5;
                    ?>
                    <div class="product-rating">
                        <?php
                        for ($i = 1; $i <= 5; $i++) {
                            echo '<span class="star ' . ($i <= $rating ? 'filled' : '') . '">★</span>';
                        }
                        echo ' (' . esc_html($rating) . '/5)';
                        ?>
                    </div>
                    
                    <div class="product-description">
                        <?php the_content(); ?>
                    </div>
                    
                    <?php
                    $description_ar = get_post_meta(get_the_ID(), '_description_ar', true);
                    if ($description_ar) {
                        echo '<div class="product-description-ar">';
                        echo '<h3>' . __('Description (Arabic)', 'momeez') . '</h3>';
                        echo '<p>' . wp_kses_post($description_ar) . '</p>';
                        echo '</div>';
                    }
                    ?>
                    
                    <div class="product-actions">
                        <button class="button button-primary" onclick="window.location.href='https://wa.me/966XXXXXXXXX?text=أريد%20معلومات%20عن%20المنتج:%20<?php echo esc_attr($product_code); ?>'">
                            <?php _e('Order via WhatsApp', 'momeez'); ?>
                        </button>
                    </div>
                    
                    <?php
                    $categories = get_the_terms(get_the_ID(), 'momeez_category');
                    if ($categories && !is_wp_error($categories)) {
                        echo '<div class="product-categories">';
                        echo '<strong>' . __('Category:', 'momeez') . '</strong> ';
                        echo implode(', ', array_map(function($cat) {
                            return '<a href="' . get_term_link($cat) . '">' . $cat->name . '</a>';
                        }, $categories));
                        echo '</div>';
                    }
                    ?>
                </div>
            </article>
            
            <?php
            // Related products
            $related_args = array(
                'post_type' => 'momeez_product',
                'posts_per_page' => 4,
                'post__not_in' => array(get_the_ID()),
                'tax_query' => array(
                    array(
                        'taxonomy' => 'momeez_category',
                        'field' => 'term_id',
                        'terms' => wp_list_pluck($categories, 'term_id'),
                    ),
                ),
            );
            $related = new WP_Query($related_args);
            
            if ($related->have_posts()) {
                ?>
                <section class="related-products">
                    <h2><?php _e('Related Products', 'momeez'); ?></h2>
                    <div class="momeez-products-grid">
                        <?php
                        while ($related->have_posts()) {
                            $related->the_post();
                            get_template_part('template-parts/content', 'product');
                        }
                        ?>
                    </div>
                </section>
                <?php
            }
            wp_reset_postdata();
        }
        ?>
    </div>
</main>

<?php
get_footer();
