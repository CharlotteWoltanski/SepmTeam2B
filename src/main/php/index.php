<?php $title = "WORDLE"; ?>
<?php
    include('header.php');
    include('navbar.php');
?>

<!--Statistics cookie functionality-->
<?php
    $stat_played = $stat_win = $stat_curr_streak = $stat_max_streak = '';
    if(isset($_COOKIE['statistics'])) {
        $statistics = json_decode($_COOKIE['statistics']);

        $stat_played = $statistics->stat_played;
        $stat_win = $statistics->stat_win;
        $stat_curr_streak = $statistics->stat_curr_streak;
        $stat_max_streak = $statistics->stat_max_streak;
    }
?>


<body>
    <h1 id="title"> Wordle </h1>

    <div id="board"></div>
    <div id="message container"></div>
    <h1 id="answer"></h1>

    <div class="container">
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <h4>Statistics</h4>
                    <div id="statistics">
                        <div class="statistic-container">
                            <div class="statistic">
                                <?php echo $stat_played?>
                            </div>
                            <div class="label">
                                Played
                            </div>
                        </div>
                        <div class="statistic-container">
                            <div class="statistic">
                                <?php echo $stat_win?>
                            </div>
                            <div class="label">
                                Win %
                            </div>
                        </div>
                        <div class="statistic-container">
                            <div class="statistic">
                                <?php echo $stat_curr_streak?>
                            </div>
                            <div class="label">
                                Current Streak
                            </div>
                        </div>
                        <div class="statistic-container">
                            <div class="statistic">
                                <?php echo $stat_max_streak?>
                            </div>
                            <div class="label">
                                Max Streak
                            </div>
                        </div>
                        <div class="statistic">
    <!--                        <p>test</p>-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</body>






































<?php include('footer.php'); ?>