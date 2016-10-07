<!DOCTYPE html>

<html>
  <head>
    <?php include("meta.html"); ?>
    <meta name="description" content="Sheffield Computer Science Society">
    <title>Sheffield Computer Science Society</title>
  </head>

  <body>
    <?php include("header.html"); ?>
    <div class="wrap">
      <div class="content">

        <h1 class="title">Committee</h1>

        <div class="committee-members">

          <?php
            include('./committee-info.php');
            for ($i=0; $i<count($committee); $i++) {
              $comem = $committee[$i];
          ?>
            <section class="committee-member">
              <div class="info">
                <div class="role">
                  <h3><?= $comem["name"] ?></h3>
                  <p><?= $comem["role"] ?></p>
                </div>
                <div class="avatar">
                  <img src="assets/committee/<?= $comem["avatar"] ?>.jpg">
                </div>
              </div>
              <p class="bio"><?= $comem["bio"] ?></p>
            </section>
          <?php } ?>

      </div>


      </div>
    </div>
    <?php include('footer.html'); ?>
  </body>
</html>
