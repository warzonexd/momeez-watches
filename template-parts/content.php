<?php
/**
 * Template part for displaying post content
 */
?>

<article <?php post_class(); ?>>
    <header class="entry-header">
        <?php the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '">', '</a></h2>'); ?>
        
        <div class="entry-meta">
            <span class="posted-on">
                <?php _e('Posted on', 'momeez'); ?>
                <a href="<?php echo esc_url(get_permalink()); ?>">
                    <time datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                        <?php echo esc_html(get_the_date()); ?>
                    </time>
                </a>
            </span>
            
            <span class="byline">
                <?php _e('by', 'momeez'); ?>
                <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>">
                    <?php the_author(); ?>
                </a>
            </span>
        </div>
    </header>
    
    <?php if (has_post_thumbnail()) { ?>
        <div class="entry-thumbnail">
            <?php the_post_thumbnail('medium'); ?>
        </div>
    <?php } ?>
    
    <div class="entry-content">
        <?php
        the_excerpt();
        ?>
        <a href="<?php the_permalink(); ?>" class="button">
            <?php _e('Read More', 'momeez'); ?>
        </a>
    </div>
    
    <footer class="entry-footer">
        <?php
        $categories = get_the_category();
        if (!empty($categories)) {
            echo '<span class="cat-links">';
            echo __('Categories:', 'momeez') . ' ';
            echo implode(', ', array_map(function($cat) {
                return '<a href="' . get_category_link($cat->term_id) . '">' . $cat->name . '</a>';
            }, $categories));
            echo '</span>';
        }
        
        $tags = get_the_tags();
        if (!empty($tags)) {
            echo '<span class="tag-links">';
            echo __('Tags:', 'momeez') . ' ';
            echo implode(', ', array_map(function($tag) {
                return '<a href="' . get_tag_link($tag->term_id) . '">' . $tag->name . '</a>';
            }, $tags));
            echo '</span>';
        }
        ?>
    </footer>
</article>
