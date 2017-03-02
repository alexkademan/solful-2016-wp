<?php

echo "<table class=\"class-table\"><tbody><tr>";

$link100 = "https://clients.mindbodyonline.com/classic/ws?studioid=44288&stype=41&sTG=3&prodId=10105";

echo  "<td>";
echo "<a href=\"" . $link100 . "\" class=\"package-link\">";
echo    "<h1>Solful Unlimited</h1>";
echo    "<h2>$130</h2>";
echo    "<ul>";
echo        "<li>&bull; Unlimited classes</li>";
echo        "<li>&bull; 2 free guest passes each month</li>";
echo        "<li>&bull; Discounts on workshops and special events</li>";
echo        "<li>&bull; Package credits for referrals</li>";
echo        "<li>&bull; Complimentary wellness consultation</li>";
echo        "<li>&bull; 6 month commitment</li>";
echo    "</ul>";
echo "</a>";
echo  "</td>";

echo "</tr></tbody></table>";

// row 2:

$link_month = "https://clients.mindbodyonline.com/classic/ws?studioid=44288&stype=41&sTG=3&prodId=10105";

echo "<table class=\"class-table\"><tbody><tr>";

echo  "<td>";
echo    "<a href=\"" . $link_month . "\" class=\"package-link\">";
echo      "<h1>Month Unlimited</h1>";
echo      "<h2>$150</h2>";
echo      "<p>Enjoy 30 days of unlimited classes</p>";
echo    "</a>";
echo  "</td>";

echo "<td class=\"spacer\"></td>";

$link_ten = "https://clients.mindbodyonline.com/classic/ws?studioid=44288&stype=41&sTG=3&prodId=10102";

echo  "<td>";
echo    "<a href=\"" . $link_ten . "\" class=\"package-link\">";
echo      "<h1>10 Class Pack</h1>";
echo      "<h2>$135</h2>";
echo      "<p>Enjoy 10 classes in a 3 month period</p>";
echo    "</a>";
echo  "</td>";

echo "</tr></tbody></table>";

// row 3:
echo "<div class=\"grid-row\">";
echo "<table class=\"class-table\"><tbody><tr>";


$link_five = "https://clients.mindbodyonline.com/classic/ws?studioid=44288&stype=41&sTG=3";
echo "<td>";
echo  "<a href=\"" . $link_five . "\" class=\"package-link\">";
echo    "<h1>5 Class Pack</h1>";
echo    "<h2>$75</h2>";
echo    "<p>Enjoy 5 classes in a 3 month period</p>";
echo  "</a>";
echo  "</td>";

echo "<td class=\"spacer\"></td>";

$link_single = "https://clients.mindbodyonline.com/classic/ws?studioid=44288&stype=41&sTG=3&prodId=10101";
echo "<td>";
echo  "<a href=\"" . $link_single . "\" class=\"package-link\">";
echo    "<h1>Single Class Drop In</h1>";
echo    "<h2>$18</h2>";
echo  "</a>";
echo "</td>";

echo "<td class=\"spacer\"></td>";

$link_new_client = "https://clients.mindbodyonline.com/classic/ws?studioid=44288&stype=41&sTG=3";
echo "<td>";
echo  "<a href=\"" . $link_new_client . "\" class=\"package-link\">";
echo    "<h1>New Client Special</h1>";
echo    "<h2>$10</h2>";
echo    "<p>10 days unlimited classes for $10 - New clients only.</p>";
echo  "</a>";
echo "</td>";

echo "</tr></tbody></table>";
echo "</div>";
