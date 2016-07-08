<nav id="site-nav" class="site-nav">
  <span><?php // this span is to get the height of the hidden menu via jquery
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

if(isset($GLOBALS['this_site']['sub_navigation'])) {

  echo '<span class="sn">';
  echo  '<span>';
  echo    '<ul class="subNav">';

  foreach($GLOBALS['this_site']['sub_navigation'] as $key1=>$item) {
    echo '<li><a href="' . $item['permalink'] . '">' . $item['title'] . '</a></li>';
  }

  echo    '</ul>';
  echo   '</span>';
  echo  '</span>';
}
?>
  </span>
</nav>
