<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>View PDF</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('/css/style.css') }}">
    <script src="{{ asset("/js/pdf.min.js") }}"></script>
    <script src="{{ asset("/js/pdf.worker.min.js") }}"></script>
    @vite(["resources/js/app.js", "resources/js/pdfReader.js",])
    <style>
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type="number"] {
        -moz-appearance: textfield;
      }
    </style>
  </head>
  <body>
    <div class="px-4 py-2 bg-body-tertiary position-sticky shadow-sm fixed-top">
      <div class="row align-items-center">
          <div class="col-5">
            <div class="d-flex align-items-center justify-content-between">
              <a href="" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover text-decoration-none">
                <i class="fa-solid fa-book"></i> Books</a>
              <div class="d-flex align-items-center justify-content-center gap-1">
                <input type="number" class="form-control form-control-sm" min="1" style="width: 150px;" id="pageNumberInput" data-bs-toggle="tooltip" data-bs-placement="top" title="Pages">
                <span class="text-center" style="white-space: nowrap;">of <span id="totalPage"></b></span>
                <button class="btn btn-dark btn-sm" style="white-space: nowrap;" id="go"  data-bs-toggle="tooltip" data-bs-placement="top" title="Go to page">
                  <i class="fa-solid fa-right-long"></i>
                </button>
              </div>
              <div class="d-flex align-items-center justify-content-between gap-1">
                <button class="btn btn-dark btn-sm" id="prev" data-bs-toggle="tooltip" data-bs-placement="top" title="Previous page">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button class="btn btn-dark btn-sm" id="next" data-bs-toggle="tooltip" data-bs-placement="top" title="Next page">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
              <div class="d-flex align-items-center justify-content-between gap-1">
                <button class="btn btn-dark btn-sm" id="zoom_out" data-bs-toggle="tooltip" data-bs-placement="top" title="Zoom out">
                  <i class="fa-solid fa-magnifying-glass-minus"></i>
                </button>
                <button class="btn btn-dark btn-sm" id="zoom_in" data-bs-toggle="tooltip" data-bs-placement="top" title="Zoom in">
                  <i class="fa-solid fa-magnifying-glass-plus"></i>
                </button>
                <button class="btn btn-dark btn-sm" id="resetZoom" data-bs-toggle="tooltip" data-bs-placement="top" title="Reset zoom">
                  <i class="fa-solid fa-arrow-rotate-right"></i>
                </button>
              </div>

            </div>
          </div>
          <div class="col-7">
            <h5>Atomic Habits by James Clear</h5>
            <span class="d-none" id="book_path">{{ Storage::url("books/Atomic Habits.pdf") }}</span>
          </div>
      </div>
    </div>
    <section id="pdfViewer" class="mx-auto mt-3 d-flex justify-content-center">
      <canvas id="canvas"></canvas>
    </section>
    <script>
      // Initialize tooltips
      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/f382a3eae6.js" crossorigin="anonymous"></script>
  </body>
</html>