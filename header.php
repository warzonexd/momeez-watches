<?php
/**
 * Header template for Momeez Watches Theme
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php bloginfo('description'); ?>">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    
    <header class="site-header">
        <div class="container">
            <nav class="site-nav">
                <div class="site-branding">
                    <?php
                    if (has_custom_logo()) {
                        the_custom_logo();
                    } else {
                        echo '<h1 class="site-title"><a href="' . esc_url(home_url('/')) . '">' . get_bloginfo('name') . '</a></h1>';
                    }
                    ?>
                </div>
                
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_class' => 'primary-menu',
                    'fallback_cb' => 'wp_page_menu',
                    'depth' => 2,
                ));
                ?>
                
                <div class="header-actions">
                    <form method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
                        <input type="search" class="search-field" placeholder="<?php _e('Search...', 'momeez'); ?>" value="<?php echo get_search_query(); ?>" name="s">
                        <button type="submit" class="search-submit"><?php _e('Search', 'momeez'); ?></button>
                    </form>
                </div>
            </nav>
        </div>
    </header>
    
    <?php
    if (is_front_page() && !is_paged()) {
        get_template_part('template-parts/hero');
    }
    ?>
