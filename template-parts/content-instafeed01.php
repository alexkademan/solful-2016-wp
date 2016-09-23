
<script type="text/javascript" src="<?php echo get_bloginfo('template_url') ?>/js/instafeed.min.js"></script>
<script type="text/javascript">
    var feed = new Instafeed({
        get: 'tagged',
        tagName: 'workout',
        clientId: '11376604_838226132913066_1842243405'
    });
    feed.run();
</script>
