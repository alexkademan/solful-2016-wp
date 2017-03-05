<?php

$image_URL = get_bloginfo('template_url') . "/image-grid-home/";
$image_dir = get_template_directory() . "/image-grid-home/";

$spacer_URL = get_bloginfo('template_url') . "/image-grid-spacers/";
$spacer_dir = get_template_directory() . "/image-grid-spacers/";

$images = pull_all_grid_images($image_dir);
$spacers = pull_all_grid_images($spacer_dir);


function pull_all_grid_images($image_dir) {

    $images = [];

    if ($handle = opendir($image_dir)) {

        while (false !== ($entry = readdir($handle))) {

            if ($entry != "." && $entry != "..") {
                $image = "$entry";
                array_push($images,  $image);
            }
        }

        closedir($handle);
    }

    return $images;

}

// render the thing:

// shuffle($images); // randomize

echo '<div id="photo-grid" class="photo-grid">';
echo '<div class="hid">';
$grid_info = [
    "spacer_URL" => $spacer_URL,
    "image_URL" => $image_URL,
    "spacers" => $spacers,
    "images" => $images,
];

print_r(json_encode($grid_info));

echo '</div>';

foreach ($images as $grid_image) {

    shuffle($spacers);

    $this_image = $image_URL . $grid_image;
    $this_spacer = $spacer_URL . $spacers[0];
    $this_style = 'background-image:url(' . $this_image . ');';

    echo '<div class="grid-photo">';
    echo    '<img src="' . $this_spacer . '" />';
    echo    '<img src="' . $this_spacer . '" style="' . $this_style . '" class="background" />';
    echo    '<a href="' . $this_image . '"></a>';
    echo '</div>';
}

echo '</div>';
