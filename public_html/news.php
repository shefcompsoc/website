<!DOCTYPE html>

<html>
  <head>
    <?php include("meta.html"); ?>
    <meta name="description" content="Sheffield Computer Science Society">
    <title>News - Sheffield Computer Science Society</title>
  </head>

  <body>
    <?php include("header.html"); ?>
    <div class="container">
      <div class="content">
        <div class="page-title">
          <h1>News</h1>
        </div>

        <?php require "wp-blog-header.php";?>
        <?php
        $posts = get_posts('numberposts=20&order=DESC&orderby=date');
        foreach ($posts as $post) : start_wp();?>
        <?php echo '<article>';?>
        <?php echo '<h2>'; the_title(); echo '<br />'; echo '</h2>';?>
        <?php the_post_thumbnail(full);?>
        <?php the_content();?>
        <?php echo '</article>';?>
        <?php
        endforeach;?>
      </div>
    </div>
  </body>
</html>
