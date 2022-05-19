<?php $title = "WORDLE"; ?>
<?php
    include('header.php');
    include('navbar.php');
?>




<body>
    <h1 id="title"> Wordle </h1>

    <div id="board"></div>
    <div id="message container"></div>
    <h1 id="answer"></h1>

    <div class="container">
      <h2>Large Modal</h2>
      <!-- Trigger the modal with a button -->

      <!-- Modal -->
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <p>This is a large modal.</p>
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