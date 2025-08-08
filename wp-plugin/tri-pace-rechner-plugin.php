<?php

/**
 * Plugin Name: Triathlon Pace Rechner
 * Plugin URI: https://www.pierrelaub.de
 * Description: Display pace rechner using shortcode [pace-rechner]
 * Version: 1.0.36
 * Text Domain: triathlon-pace-rechner
 * Author: Pierre Laub
 * Author URI: https://www.pierrelaub.de
 */

//Register scripts to use
function func_load_pace_rechner_scripts()
{
    $version = '1.0.36';
    // Register in dependency order - base chunk first
        wp_register_script('pace-rechner_script_0', plugin_dir_url(__FILE__) . 'dist/_nuxt/txLwXk5y.js', array(), $version, true);
    
    // Add module type for ES6 imports
    add_filter('script_loader_tag', 'add_module_to_pace_rechner_scripts', 10, 3);
}

// Function to add type="module" to pace-rechner scripts
function add_module_to_pace_rechner_scripts($tag, $handle, $src) {
    if (strpos($handle, 'pace-rechner_') === 0) {
        $tag = str_replace('<script ', '<script type="module" defer ', $tag);
    }
    return $tag;
}
//Tell WordPress to register the scripts 
add_action('wp_enqueue_scripts', 'func_load_pace_rechner_scripts');

//Return string for shortcode
function func_wp_pace_rechner()
{
    $version = '1.0.36';
    
    // Enqueue the single script that was generated
    
    wp_enqueue_script('pace-rechner_script_0');
    wp_enqueue_style('pace-rechner', plugin_dir_url(__FILE__) . 'dist/_nuxt/entry.ggozEPIJ.css', null, $version);

    //Build String
    $str = '<div id="__nuxt"></div><script>window.__NUXT__={};window.__NUXT__.config={public:{},app:{baseURL:"/",buildId:"b369736d-14d3-4a8a-8624-d313d118f934",buildAssetsDir:"' . plugin_dir_url(__FILE__) . 'dist/_nuxt/",cdnURL:""}}</script>';

    //Return to display
    return $str;
} // end function

//Add shortcode to WordPress
add_shortcode('pace-rechner', 'func_wp_pace_rechner');
