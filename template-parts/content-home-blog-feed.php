<?php

$args = [
  'category' => 4, // 'home-page' category
  'numberposts' => 3
];

$home_blog_posts = get_posts( $args );

for ($i = 0; $i <= count($home_blog_posts); $i++) {
  // echo "The number is: $i <br>";

  echo '<article>';
  echo  '<div class="content">' . $home_blog_posts[$i]->post_content . '</div>';
  echo '</article>';

}
