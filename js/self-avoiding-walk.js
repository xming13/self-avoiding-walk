$(document).ready(function() {
    $("#btn-go").click(function() {

        var $btn = $(this);
        $btn.button('loading');

        $("#success, #error, #progress, #btn-stop").hide();
        $("#progress-bar").removeClass("progress-bar-warning progress-bar-danger");

        var selectedGridSize = $("#select-grid-size").val();

        var worker = new Worker("js/worker-compute.min.js");
        worker.onmessage = function(e) {
            var data = e.data;

            $("#success").html("There are <b>" + data.numPaths + "</b> "
                    + "different paths to move from top left to bottom right in a "
                    + "<b>" + selectedGridSize + "x" + selectedGridSize + "</b> grid without visitng the same square twice. "
                    + "<br><br>Time taken to calculate this: <b>" + data.duration + "</b>")
                .show();

            $btn.button('reset');
            $("#progress").hide();

            $('html, body').animate({
                scrollTop: $("#success").offset().top
            });
        };
        worker.onerror = function(e) {
            $("#error").html([
                'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
            ].join('')).show();

            $btn.button('reset');
            $("#progress").hide();

            $('html, body').animate({
                scrollTop: $("#error").offset().top
            });
        };

        worker.postMessage({
            gridSize: selectedGridSize
        }); // Start the worker

        switch (selectedGridSize) {
            case "6":
                $("#estimate").html("This will take around 5 minutes");
                $("#progress, #btn-stop").show();
                $('html, body').animate({
                    scrollTop: $("#progress").offset().top
                });
                break;
            case "7":
                $("#progress-bar").addClass("progress-bar-warning");
                $("#estimate").html("This will take at least a few hours...");
                $("#progress, #btn-stop").show();
                $('html, body').animate({
                    scrollTop: $("#progress").offset().top
                });
                break;
            case "8":
                $("#progress-bar").addClass("progress-bar-danger");
                $("#estimate").html("This will probably take forever. You've been warned.");
                $("#progress, #btn-stop").show();
                $('html, body').animate({
                    scrollTop: $("#progress").offset().top
                });
            default:
                break;
        }

        $("#btn-stop").click(function() {
            worker.terminate();
            $btn.button('reset');
            $("#progress, #btn-stop").hide();
        });
    });
});