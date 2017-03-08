<?php

$locate = [
    "url" => get_bloginfo("template_url"),
    "dir" => get_template_directory(),
];

$grid_info = [
    "spacer_URL" => $locate["url"] . "/image-grid-spacers/",
    "image_URL" => $locate["url"] . "/image-grid-home/",

    "spacers" => pull_all_grid_images($locate["dir"] .
            "/image-grid-spacers/"),
    "images" => pull_all_grid_images($locate["dir"] .
            "/image-grid-home/"),
];

$grid_info["image_sizes"] = pull_all_image_sizes($grid_info["images"]);

// render the thing:
echo '<div id="photo-grid" class="photo-grid">';
echo    '<div class="hid">';

print_r(json_encode($grid_info));

echo    '</div>';
echo '</div>';

function pull_all_grid_images($image_dir) {

    $images = [];

    if ($handle = opendir($image_dir)) {

        while (false !== ($entry = readdir($handle))) {

            if ($entry != "." && $entry != "..") {

                $image['filename'] = $entry;
                $image['dimensions'] = getimagesize($image_dir . $entry);
                $image['width'] = $image['dimensions'][0];
                $image['height'] = $image['dimensions'][1];

                array_push($images,  $image);
            }
        }

        closedir($handle);
    }

    return $images;

}

function pull_all_image_sizes($image_array) {

    // for($i = 0; $i < count($image_array); ++$i) {
    //     print_r($image_array[$i]);
    // }

}
