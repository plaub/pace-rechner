<?php

/**
 * Plugin Name: Triathlon Pace Rechner
 * Plugin URI: https://www.7ddl.de
 * Description: Display calories rechner using shortcode [pace-rechner]
 * Version: 0.1
 * Text Domain: triathlon-pace-rechner
 * Author: 7Dog Data Labs GmbH
 * Author URI: https://www.7ddl.de
 */

//Register scripts to use
function func_load_pace_rechner_scripts()
{
    $version = '1.0.6';
    wp_register_script('pace-rechner_app', plugin_dir_url(__FILE__) . 'dist/_nuxt/entry-19dd41b2.mjs');
}
//Tell WordPress to register the scripts 
add_action('wp_enqueue_scripts', 'func_load_pace_rechner_scripts');

//Return string for shortcode
function func_wp_pace_rechner()
{
    $version = '1.0.6';
    //Add Vue.js
    wp_enqueue_script('pace-rechner_app');
    //Add my code to it
    // wp_enqueue_script('vue_vendors');

    wp_enqueue_style('pace-rechner', plugin_dir_url(__FILE__) . 'dist/_nuxt/entry.2169e9da.css', null);

    //Build String
    $str = '<div id="__nuxt"><div><!--[--><div class="toolbar" data-v-7b33e348><div data-v-7b33e348><label data-v-7b33e348> Um wieviel Uhr startest du? </label><div data-v-7b33e348><span class="vue__time-picker" style="width:80px;" append-to-body><input type="text" class="vue__time-picker-input is-empty" style="width:80px;" placeholder="HH:mm:ss" tabindex="0" autocomplete="off"><!--v-if--><!--v-if--><!--v-if--><div class="dropdown drop-down" tabindex="-1" style="width:80px;display:none;"><div class="select-list" style="width:80px;" tabindex="-1"><!-- Common Keyboard Support: less event listeners --><!--[--><!--[--><ul class="hours"><li class="hint">HH</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--v-if--><!--]--><!--[--><!--v-if--><ul class="minutes"><li class="hint">mm</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--]--><!--]--><!-- / Common Keyboard Support --><!--
    Advanced Keyboard Support
    Addeds hundreds of additional event lisenters
  --><!--v-if--><!-- / Advanced Keyboard Support --></div></div></span></div></div><select name="" id="presets" class="w-full bg-white rounded" data-v-7b33e348><option value="" data-v-7b33e348>Vorlagen</option><option value="sprint" data-v-7b33e348>Sprint</option><option value="olympic" data-v-7b33e348>Olympisch</option><option value="md" data-v-7b33e348>Mitteldistanz</option><option value="ld" data-v-7b33e348>Langdistanz</option></select></div><div class="wrapper" data-v-7b33e348><div class="pace-rechner" data-v-7b33e348><div class="wrapper" style="background-color:#74b9ff;color:#ffffff;" data-v-7b33e348 data-v-1ae05c34><span class="title" data-v-1ae05c34>Swim</span><div class="row" data-v-1ae05c34><div class="label" data-v-1ae05c34> Distanz <br data-v-1ae05c34><small class="unit" data-v-1ae05c34>m</small></div><div class="picker" data-v-1ae05c34><input type="number" value="3800" data-v-1ae05c34></div></div><div class="row" data-v-1ae05c34><div class="label" data-v-1ae05c34>Zeit</div><div class="picker" data-v-1ae05c34><div data-v-1ae05c34><span class="vue__time-picker" style="width:80px;" append-to-body><input type="text" class="vue__time-picker-input is-empty" style="width:80px;" placeholder="HH:mm:ss" tabindex="0" autocomplete="off"><!--v-if--><!--v-if--><!--v-if--><div class="dropdown drop-down" tabindex="-1" style="width:80px;display:none;"><div class="select-list" style="width:80px;" tabindex="-1"><!-- Common Keyboard Support: less event listeners --><!--[--><!--[--><ul class="hours"><li class="hint">HH</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--v-if--><!--]--><!--[--><!--v-if--><ul class="minutes"><li class="hint">mm</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--]--><!--]--><!-- / Common Keyboard Support --><!--
    Advanced Keyboard Support
    Addeds hundreds of additional event lisenters
  --><!--v-if--><!-- / Advanced Keyboard Support --></div></div></span></div></div></div><div class="row" data-v-1ae05c34><div class="label" data-v-1ae05c34> Pace <br data-v-1ae05c34><small class="unit" data-v-1ae05c34>min/100m</small></div><div class="picker" data-v-1ae05c34><div data-v-1ae05c34><span class="vue__time-picker" style="width:80px;" append-to-body><input type="text" class="vue__time-picker-input is-empty" style="width:80px;" placeholder="HH:mm:ss" tabindex="0" autocomplete="off"><!--v-if--><!--v-if--><!--v-if--><div class="dropdown drop-down" tabindex="-1" style="width:80px;display:none;"><div class="select-list" style="width:80px;" tabindex="-1"><!-- Common Keyboard Support: less event listeners --><!--[--><!--[--><ul class="hours"><li class="hint">HH</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--v-if--><!--]--><!--[--><!--v-if--><ul class="minutes"><li class="hint">mm</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--]--><!--]--><!-- / Common Keyboard Support --><!--
    Advanced Keyboard Support
    Addeds hundreds of additional event lisenters
  --><!--v-if--><!-- / Advanced Keyboard Support --></div></div></span></div></div></div><!----></div></div><div class="pace-rechner" data-v-7b33e348><div class="wrapper" data-v-7b33e348 data-v-12dbb1fc><span class="title" data-v-12dbb1fc>T</span><div class="row" data-v-12dbb1fc><div class="picker" data-v-12dbb1fc><div data-v-12dbb1fc><span class="vue__time-picker" style="width:80px;" append-to-body><input type="text" class="vue__time-picker-input is-empty" style="width:80px;" placeholder="HH:mm:ss" tabindex="0" autocomplete="off"><!--v-if--><!--v-if--><!--v-if--><div class="dropdown drop-down" tabindex="-1" style="width:80px;display:none;"><div class="select-list" style="width:80px;" tabindex="-1"><!-- Common Keyboard Support: less event listeners --><!--[--><!--[--><ul class="hours"><li class="hint">HH</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--v-if--><!--]--><!--[--><!--v-if--><ul class="minutes"><li class="hint">mm</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--]--><!--]--><!-- / Common Keyboard Support --><!--
    Advanced Keyboard Support
    Addeds hundreds of additional event lisenters
  --><!--v-if--><!-- / Advanced Keyboard Support --></div></div></span></div></div></div></div></div><div class="pace-rechner" data-v-7b33e348><div class="wrapper" style="background-color:#00b894;color:#fefefe;" speedunit="km/h" data-v-7b33e348 data-v-1ae05c34><span class="title" data-v-1ae05c34>Bike</span><div class="row" data-v-1ae05c34><div class="label" data-v-1ae05c34> Distanz <br data-v-1ae05c34><small class="unit" data-v-1ae05c34>km</small></div><div class="picker" data-v-1ae05c34><input type="number" value="180" data-v-1ae05c34></div></div><div class="row" data-v-1ae05c34><div class="label" data-v-1ae05c34>Zeit</div><div class="picker" data-v-1ae05c34><div data-v-1ae05c34><span class="vue__time-picker" style="width:80px;" append-to-body><input type="text" class="vue__time-picker-input is-empty" style="width:80px;" placeholder="HH:mm:ss" tabindex="0" autocomplete="off"><!--v-if--><!--v-if--><!--v-if--><div class="dropdown drop-down" tabindex="-1" style="width:80px;display:none;"><div class="select-list" style="width:80px;" tabindex="-1"><!-- Common Keyboard Support: less event listeners --><!--[--><!--[--><ul class="hours"><li class="hint">HH</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--v-if--><!--]--><!--[--><!--v-if--><ul class="minutes"><li class="hint">mm</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--]--><!--]--><!-- / Common Keyboard Support --><!--
    Advanced Keyboard Support
    Addeds hundreds of additional event lisenters
  --><!--v-if--><!-- / Advanced Keyboard Support --></div></div></span></div></div></div><!----><div class="row" data-v-1ae05c34><div class="label" data-v-1ae05c34> Speed <br data-v-1ae05c34><small class="unit" data-v-1ae05c34>km / h</small></div><div class="picker" data-v-1ae05c34><input type="number" value="25" min="1" data-v-1ae05c34></div></div></div></div><div class="pace-rechner" data-v-7b33e348><div class="wrapper" data-v-7b33e348 data-v-12dbb1fc><span class="title" data-v-12dbb1fc>T</span><div class="row" data-v-12dbb1fc><div class="picker" data-v-12dbb1fc><div data-v-12dbb1fc><span class="vue__time-picker" style="width:80px;" append-to-body><input type="text" class="vue__time-picker-input is-empty" style="width:80px;" placeholder="HH:mm:ss" tabindex="0" autocomplete="off"><!--v-if--><!--v-if--><!--v-if--><div class="dropdown drop-down" tabindex="-1" style="width:80px;display:none;"><div class="select-list" style="width:80px;" tabindex="-1"><!-- Common Keyboard Support: less event listeners --><!--[--><!--[--><ul class="hours"><li class="hint">HH</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--v-if--><!--]--><!--[--><!--v-if--><ul class="minutes"><li class="hint">mm</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--]--><!--]--><!-- / Common Keyboard Support --><!--
    Advanced Keyboard Support
    Addeds hundreds of additional event lisenters
  --><!--v-if--><!-- / Advanced Keyboard Support --></div></div></span></div></div></div></div></div><div class="pace-rechner" data-v-7b33e348><div class="wrapper" style="background-color:#fab1a0;color:#2d3436;" data-v-7b33e348 data-v-1ae05c34><span class="title" data-v-1ae05c34>Run</span><div class="row" data-v-1ae05c34><div class="label" data-v-1ae05c34> Distanz <br data-v-1ae05c34><small class="unit" data-v-1ae05c34>m</small></div><div class="picker" data-v-1ae05c34><input type="number" value="42195" data-v-1ae05c34></div></div><div class="row" data-v-1ae05c34><div class="label" data-v-1ae05c34>Zeit</div><div class="picker" data-v-1ae05c34><div data-v-1ae05c34><span class="vue__time-picker" style="width:80px;" append-to-body><input type="text" class="vue__time-picker-input is-empty" style="width:80px;" placeholder="HH:mm:ss" tabindex="0" autocomplete="off"><!--v-if--><!--v-if--><!--v-if--><div class="dropdown drop-down" tabindex="-1" style="width:80px;display:none;"><div class="select-list" style="width:80px;" tabindex="-1"><!-- Common Keyboard Support: less event listeners --><!--[--><!--[--><ul class="hours"><li class="hint">HH</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--v-if--><!--]--><!--[--><!--v-if--><ul class="minutes"><li class="hint">mm</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--]--><!--]--><!-- / Common Keyboard Support --><!--
    Advanced Keyboard Support
    Addeds hundreds of additional event lisenters
  --><!--v-if--><!-- / Advanced Keyboard Support --></div></div></span></div></div></div><div class="row" data-v-1ae05c34><div class="label" data-v-1ae05c34> Pace <br data-v-1ae05c34><small class="unit" data-v-1ae05c34>min/km</small></div><div class="picker" data-v-1ae05c34><div data-v-1ae05c34><span class="vue__time-picker" style="width:80px;" append-to-body><input type="text" class="vue__time-picker-input is-empty" style="width:80px;" placeholder="HH:mm:ss" tabindex="0" autocomplete="off"><!--v-if--><!--v-if--><!--v-if--><div class="dropdown drop-down" tabindex="-1" style="width:80px;display:none;"><div class="select-list" style="width:80px;" tabindex="-1"><!-- Common Keyboard Support: less event listeners --><!--[--><!--[--><ul class="hours"><li class="hint">HH</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--v-if--><!--]--><!--[--><!--v-if--><ul class="minutes"><li class="hint">mm</li><!--[--><!--]--></ul><!--v-if--><!--v-if--><!--]--><!--]--><!-- / Common Keyboard Support --><!--
    Advanced Keyboard Support
    Addeds hundreds of additional event lisenters
  --><!--v-if--><!-- / Advanced Keyboard Support --></div></div></span></div></div></div><!----></div></div></div><div class="wrapper" data-v-7b33e348><div class="pace-rechner summary" data-v-7b33e348><table data-v-7b33e348><tbody data-v-7b33e348><tr data-v-7b33e348><td data-v-7b33e348>Gesamt Zeit:</td><td data-v-7b33e348>00:00:00</td></tr><tr class="blank_row" data-v-7b33e348><td data-v-7b33e348></td><td data-v-7b33e348></td></tr><tr data-v-7b33e348><td data-v-7b33e348>Uhrzeit nach Swim:</td><td data-v-7b33e348>07:00:00</td></tr><tr data-v-7b33e348><td data-v-7b33e348>Uhrzeit nach Bike:</td><td data-v-7b33e348>07:00:00</td></tr><tr data-v-7b33e348><td data-v-7b33e348>Uhrzeit im Ziel:</td><td data-v-7b33e348>07:00:00</td></tr></tbody></table></div></div><!--]--></div></div><script>window.__NUXT__={data:{},state:{error:null},_errors:{},serverRendered:true,config:{public:{},app:{baseURL:"\u002F",buildAssetsDir:"\u002F_nuxt\u002F",cdnURL:""}}}</script>
';

    //Return to display
    return $str;
} // end function

//Add shortcode to WordPress
add_shortcode('pace-rechner', 'func_wp_pace_rechner');
