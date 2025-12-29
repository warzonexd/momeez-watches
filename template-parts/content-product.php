<?php
/**
 * Template part for displaying product card
 */
?>

<div class="momeez-product-card">
    <a href="<?php the_permalink(); ?>" class="product-link">
        <div class="product-image">
            <?php
            $images = get_post_meta(get_the_ID(), '_product_images', true);
            if ($images && is_array($images)) {
                echo '<img src="' . esc_url($images[0]) . '" alt="' . esc_attr(get_the_title()) . '">';
            } elseif (has_post_thumbnail()) {
                the_post_thumbnail('medium');
            } else {
                echo '<img src="' . esc_url(get_template_directory_uri() . '/images/placeholder.png') . '" alt="' . esc_attr(get_the_title()) . '">';
            }
            ?>
        </div>
        
        <div class="product-info">
            <h3><?php the_title(); ?></h3>
            
            <?php
            $name_ar = get_post_meta(get_the_ID(), '_name_ar', true);
            if ($name_ar) {
                echo '<p class="product-name-ar">' . esc_html($name_ar) . '</p>';
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
                ?>
            </div>
        </div>
    </a>
</div>
