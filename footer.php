<?php
/**
 * Footer template for Momeez Watches Theme
 */
?>
    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3><?php _e('About Us', 'momeez'); ?></h3>
                    <p><?php bloginfo('description'); ?></p>
                </div>
                
                <div class="footer-section">
                    <h3><?php _e('Quick Links', 'momeez'); ?></h3>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'menu_class' => 'footer-menu',
                        'fallback_cb' => 'wp_page_menu',
                        'depth' => 1,
                    ));
                    ?>
                </div>
                
                <div class="footer-section">
                    <h3><?php _e('Categories', 'momeez'); ?></h3>
                    <ul>
                        <?php
                        $categories = get_terms(array(
                            'taxonomy' => 'momeez_category',
                            'hide_empty' => false,
                        ));
                        foreach ($categories as $category) {
                            echo '<li><a href="' . get_term_link($category) . '">' . $category->name . '</a></li>';
                        }
                        ?>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3><?php _e('Contact Us', 'momeez'); ?></h3>
                    <p>
                        <?php _e('Email:', 'momeez'); ?> <a href="mailto:<?php echo antispambot(get_option('admin_email')); ?>"><?php echo antispambot(get_option('admin_email')); ?></a><br>
                        <?php _e('Phone:', 'momeez'); ?> <a href="tel:+966XXXXXXXXX">+966 XX XXX XXXX</a>
                    </p>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php _e('All rights reserved.', 'momeez'); ?></p>
                <p><?php _e('Designed with', 'momeez'); ?> ❤️ <?php _e('by Momeez Team', 'momeez'); ?></p>
            </div>
        </div>
    </footer>
    
    <?php wp_footer(); ?>
</body>
</html>
