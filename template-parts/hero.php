<?php
/**
 * Template part for hero section on homepage
 */
?>

<section class="hero-section">
    <div class="hero-content">
        <div class="container">
            <h1><?php bloginfo('name'); ?></h1>
            <p><?php bloginfo('description'); ?></p>
            <a href="<?php echo esc_url(get_post_type_archive_link('momeez_product')); ?>" class="button button-primary">
                <?php _e('Shop Now', 'momeez'); ?>
            </a>
        </div>
    </div>
</section>

<section class="featured-products">
    <div class="container">
        <h2><?php _e('Featured Products', 'momeez'); ?></h2>
        
        <?php
        $featured = new WP_Query(array(
            'post_type' => 'momeez_product',
            'posts_per_page' => 8,
            'orderby' => 'date',
            'order' => 'DESC',
        ));
        
        if ($featured->have_posts()) {
            echo '<div class="momeez-products-grid">';
            while ($featured->have_posts()) {
                $featured->the_post();
                get_template_part('template-parts/content', 'product');
            }
            echo '</div>';
        }
        wp_reset_postdata();
        ?>
    </div>
</section>

<style>
.hero-section {
    background: linear-gradient(135deg, #1a9b8e 0%, #0d6b64 100%);
    color: white;
    padding: 100px 0;
    text-align: center;
}

.hero-section h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero-section p {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.featured-products {
    padding: 60px 0;
    background: #f9f9f9;
}

.featured-products h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2rem;
}

@media (max-width: 768px) {
    .hero-section {
        padding: 50px 0;
    }
    
    .hero-section h1 {
        font-size: 2rem;
    }
    
    .hero-section p {
        font-size: 1rem;
    }
}
</style>
