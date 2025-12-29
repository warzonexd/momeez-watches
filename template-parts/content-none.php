<?php
/**
 * Template part for displaying no content
 */
?>

<section class="no-results not-found">
    <header class="page-header">
        <h1 class="page-title"><?php _e('Nothing Found', 'momeez'); ?></h1>
    </header>
    
    <div class="page-content">
        <?php
        if (is_search()) {
            ?>
            <p><?php _e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'momeez'); ?></p>
            <?php
            get_search_form();
        } elseif (is_archive()) {
            ?>
            <p><?php _e('Sorry, but there are no posts in the requested category or date range.', 'momeez'); ?></p>
            <?php
        } else {
            ?>
            <p><?php _e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'momeez'); ?></p>
            <?php
            get_search_form();
        }
        ?>
    </div>
</section>
