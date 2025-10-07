<?php
/**
 * Template for displaying comments
 */

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area">

    <?php if (have_comments()) : ?>
        <h2 class="comments-title">
            <?php
            $comments_number = get_comments_number();
            if ('1' === $comments_number) {
                printf(_x('One thought on &ldquo;%s&rdquo;', 'comments title', 'investidor-diaspora'), '<span>' . get_the_title() . '</span>');
            } else {
                printf(
                    _nx(
                        '%1$s thought on &ldquo;%2$s&rdquo;',
                        '%1$s thoughts on &ldquo;%2$s&rdquo;',
                        $comments_number,
                        'comments title',
                        'investidor-diaspora'
                    ),
                    number_format_i18n($comments_number),
                    '<span>' . get_the_title() . '</span>'
                );
            }
            ?>
        </h2>

        <ol class="comment-list">
            <?php
            wp_list_comments(array(
                'style'      => 'ol',
                'short_ping' => true,
            ));
            ?>
        </ol>

        <?php
        the_comments_navigation(array(
            'prev_text' => __('Older comments', 'investidor-diaspora'),
            'next_text' => __('Newer comments', 'investidor-diaspora'),
        ));
        ?>

    <?php endif; ?>

    <?php
    if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')) :
    ?>
        <p class="no-comments"><?php _e('Comments are closed.', 'investidor-diaspora'); ?></p>
    <?php endif; ?>

    <?php
    comment_form(array(
        'title_reply'          => __('Leave a Reply', 'investidor-diaspora'),
        'title_reply_to'       => __('Leave a Reply to %s', 'investidor-diaspora'),
        'title_reply_before'   => '<h3 id="reply-title" class="comment-reply-title">',
        'title_reply_after'    => '</h3>',
        'cancel_reply_before'  => ' <small>',
        'cancel_reply_after'   => '</small>',
        'label_submit'         => __('Post Comment', 'investidor-diaspora'),
    ));
    ?>

</div>



