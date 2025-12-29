<?php
/**
 * Main template file for Momeez Watches Theme
 * Displays products and posts
 */

get_header();
?>

<main class="site-main">
    <div class="container">
        <?php
        if (is_home() || is_archive()) {
            ?>
            <header class="archive-header">
                <h1><?php
                    if (is_category()) {
                        single_cat_title();
                    } elseif (is_tag()) {
                        single_tag_title();
                    } elseif (is_tax('momeez_category')) {
                        single_term_title();
                    } else {
                        _e('Blog', 'momeez');
                    }
                ?></h1>
            </header>
            <?php
        }
        
        if (have_posts()) {
            if (is_post_type_archive('momeez_product') || is_tax('momeez_category')) {
                echo '<div class="momeez-products-grid">';
                while (have_posts()) {
                    the_post();
                    get_template_part('template-parts/content', 'product');
                }
                echo '</div>';
            } else {
                while (have_posts()) {
                    the_post();
                    get_template_part('template-parts/content', get_post_type());
                }
            }
            
            // Pagination
            the_posts_pagination(array(
                'mid_size' => 2,
                'prev_text' => __('← Previous', 'momeez'),
                'next_text' => __('Next →', 'momeez'),
            ));
        } else {
            get_template_part('template-parts/content', 'none');
        }
        ?>
    </div>
</main>

<?php
get_footer();
