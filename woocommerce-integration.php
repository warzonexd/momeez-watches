<?php
/**
 * WooCommerce Integration for Momeez Watches
 * This file adds WooCommerce support to the theme
 */

// Add WooCommerce support
add_theme_support('woocommerce');

// Customize WooCommerce product gallery
add_filter('woocommerce_product_thumbnails_columns', 'momeez_woocommerce_product_thumbnails_columns');
function momeez_woocommerce_product_thumbnails_columns() {
    return 4;
}

// Customize WooCommerce product related products
add_filter('woocommerce_output_related_products_args', 'momeez_woocommerce_related_products_args');
function momeez_woocommerce_related_products_args($args) {
    $args['posts_per_page'] = 4;
    $args['columns'] = 4;
    return $args;
}

// Add custom WooCommerce styles
add_action('wp_enqueue_scripts', 'momeez_woocommerce_styles');
function momeez_woocommerce_styles() {
    if (class_exists('WooCommerce')) {
        wp_enqueue_style('momeez-woocommerce', get_template_directory_uri() . '/css/woocommerce.css');
    }
}

// Customize WooCommerce product price display
add_filter('woocommerce_get_price_html', 'momeez_woocommerce_price_html', 10, 2);
function momeez_woocommerce_price_html($price, $product) {
    if ($product->is_on_sale()) {
        $regular_price = $product->get_regular_price();
        $sale_price = $product->get_sale_price();
        $price = '<span class="original-price">' . wc_price($regular_price) . '</span>';
        $price .= '<span class="current-price">' . wc_price($sale_price) . '</span>';
    }
    return $price;
}

// Add custom product meta fields
add_action('woocommerce_product_options_general_product_data', 'momeez_add_custom_product_fields');
function momeez_add_custom_product_fields() {
    global $woocommerce, $post;
    
    echo '<div class="options_group">';
    
    // Product Code
    woocommerce_wp_text_input(array(
        'id' => '_product_code',
        'label' => __('Product Code (SKU)', 'momeez'),
        'placeholder' => 'e.g., WATCH-001',
        'description' => __('Enter a unique product code', 'momeez'),
        'desc_tip' => true,
    ));
    
    // Arabic Name
    woocommerce_wp_text_input(array(
        'id' => '_product_name_ar',
        'label' => __('Product Name (Arabic)', 'momeez'),
        'placeholder' => 'أدخل اسم المنتج بالعربية',
        'description' => __('Enter product name in Arabic', 'momeez'),
        'desc_tip' => true,
    ));
    
    // Arabic Description
    woocommerce_wp_textarea_input(array(
        'id' => '_product_description_ar',
        'label' => __('Product Description (Arabic)', 'momeez'),
        'placeholder' => 'أدخل وصف المنتج بالعربية',
        'description' => __('Enter product description in Arabic', 'momeez'),
        'desc_tip' => true,
    ));
    
    echo '</div>';
}

// Save custom product meta
add_action('woocommerce_process_product_meta', 'momeez_save_custom_product_fields');
function momeez_save_custom_product_fields($post_id) {
    if (isset($_POST['_product_code'])) {
        update_post_meta($post_id, '_product_code', sanitize_text_field($_POST['_product_code']));
    }
    if (isset($_POST['_product_name_ar'])) {
        update_post_meta($post_id, '_product_name_ar', sanitize_text_field($_POST['_product_name_ar']));
    }
    if (isset($_POST['_product_description_ar'])) {
        update_post_meta($post_id, '_product_description_ar', sanitize_textarea_field($_POST['_product_description_ar']));
    }
}

// Display custom product meta on frontend
add_action('woocommerce_product_meta_start', 'momeez_display_custom_product_meta');
function momeez_display_custom_product_meta() {
    global $product;
    
    $product_code = get_post_meta($product->get_id(), '_product_code', true);
    $name_ar = get_post_meta($product->get_id(), '_product_name_ar', true);
    
    if ($product_code) {
        echo '<div class="product-meta-code">';
        echo '<strong>' . __('Product Code:', 'momeez') . '</strong> ' . esc_html($product_code);
        echo '</div>';
    }
    
    if ($name_ar) {
        echo '<div class="product-meta-name-ar">';
        echo '<strong>' . __('Arabic Name:', 'momeez') . '</strong> ' . esc_html($name_ar);
        echo '</div>';
    }
}

// Add WhatsApp button to product page
add_action('woocommerce_after_add_to_cart_button', 'momeez_whatsapp_button');
function momeez_whatsapp_button() {
    global $product;
    
    $product_code = get_post_meta($product->get_id(), '_product_code', true);
    $product_name = $product->get_name();
    $product_price = $product->get_price();
    
    $whatsapp_number = '966XXXXXXXXX'; // Replace with actual number
    $message = urlencode("أريد معلومات عن المنتج:\n\nالاسم: $product_name\nالكود: $product_code\nالسعر: $product_price ريال");
    $whatsapp_url = "https://wa.me/$whatsapp_number?text=$message";
    
    echo '<a href="' . esc_url($whatsapp_url) . '" class="button button-whatsapp" target="_blank">';
    echo __('Order via WhatsApp', 'momeez');
    echo '</a>';
}

// Customize checkout fields
add_filter('woocommerce_checkout_fields', 'momeez_customize_checkout_fields');
function momeez_customize_checkout_fields($fields) {
    // Add Arabic name field
    $fields['billing']['billing_name_ar'] = array(
        'type' => 'text',
        'label' => __('Full Name (Arabic)', 'momeez'),
        'placeholder' => 'أدخل اسمك الكامل',
        'required' => false,
        'class' => array('form-row-wide'),
        'clear' => true,
    );
    
    return $fields;
}

// Save custom checkout fields
add_action('woocommerce_checkout_process', 'momeez_save_custom_checkout_fields');
function momeez_save_custom_checkout_fields() {
    if (isset($_POST['post_data'])) {
        parse_str($_POST['post_data'], $post_data);
    } else {
        $post_data = $_POST;
    }
    
    if (isset($post_data['billing_name_ar'])) {
        WC()->session->set('billing_name_ar', sanitize_text_field($post_data['billing_name_ar']));
    }
}

// Display order details in Arabic
add_action('woocommerce_order_details_after_order_table', 'momeez_display_order_details_ar');
function momeez_display_order_details_ar($order) {
    $name_ar = WC()->session->get('billing_name_ar');
    if ($name_ar) {
        echo '<div class="order-details-ar">';
        echo '<strong>' . __('Customer Name (Arabic):', 'momeez') . '</strong> ' . esc_html($name_ar);
        echo '</div>';
    }
}
