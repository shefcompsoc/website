<!DOCTYPE html>

<html>
  <head>
    <?php include("meta.html"); ?>
    <meta name="description" content="Sheffield Computer Science Society">
    <title>Sheffield Computer Science Society</title>
  </head>

  <body>
    <?php include("header.html"); ?>
    <div class="container">
      <div class="content">

        <div class="page-title">
          <h1>Committee</h1>
        </div>

        <div class="committee-members">

          <?php
            include('./committee-info.php');
            for ($i=0; $i<count($committee); $i++) {
              $comem = $committee[$i];
          ?>
            <section class="committee-member">
              <h3><?= $comem["name"] ?></h3>
              <p class="role"><?= $comem["role"] ?></p>
              <div>
                <div class="avatar">
                  <img src="assets/committee/<?= $comem["avatar"] ?>.jpg">
                </div>
                <p class="bio"><?= $comem["bio"] ?></p>
              </div>
            </section>
          <?php } ?>

      </div>


      </div>
    </div>
  </body>
</html>
