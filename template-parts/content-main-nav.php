<?php
echo '<nav id="site-nav" class="site-nav">';
echo   '<span>';

 // this span is to get the height of the hidden menu via jquery
if(isset($GLOBALS['this_site']['navigation'])) {

  echo '<span class="mn">';
  echo  '<span>';
  echo    '<ul class="mainNav">';

  foreach($GLOBALS['this_site']['navigation'] as $key1=>$item) {
    echo '<li><a href="' . $item['permalink'] . '">' . $item['title'] . '</a></li>';
  }
  echo    '</ul>';
  echo   '</span>';
  echo  '</span>';
}

echo  '</span>';
echo '</nav>';
