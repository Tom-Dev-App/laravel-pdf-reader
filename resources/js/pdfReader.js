// Your code using PDF.js goes here
document.addEventListener('DOMContentLoaded', function() {
  const previousButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const goButton = document.getElementById("go");
  const pageNumInput = document.getElementById("pageNumberInput")
  const zoomInButton = document.getElementById("zoom_in");
  const zoomOutButton = document.getElementById("zoom_out");
  const container = document.getElementById('pdfViewer');
  const pdfUrl = document.getElementById("book_path");
  const totalPagesTitle = document.getElementById("totalPage");
  const resetZoomButton = document.getElementById('resetZoom');

  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.

  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  var pdfjsLib = window['pdfjs-dist/build/pdf'];
  console.log(pdfUrl.innerText);

  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

  // Asynchronous download of PDF
  var loadingTask = pdfjsLib.getDocument(pdfUrl.innerText);
  var pdfInstance;
  var currentPage = 1;
  var totalPages = 0;
  var scale = 1.5;
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var renderTask = null; // Reference to the current rendering task

  loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');
    pdfInstance = pdf;
    totalPages = pdf.numPages;
    totalPagesTitle.innerText = totalPages;
    pageNumInput.value = currentPage;
    displayPage(currentPage);
  }, function(reason) {
    // PDF loading error
    console.error(reason);
  });

  previousButton.addEventListener("click", () => {
    goToPreviousPage();
  });

  nextButton.addEventListener("click", () => {
    goToNextPage();
  });

  goButton.addEventListener("click", () => {
    goToPage();
  });

  zoomInButton.addEventListener("click", () => {
    zoomIn();
  });

  zoomOutButton.addEventListener("click", () => {
    zoomOut();
  });

  resetZoomButton.addEventListener('click', function() {
    // Reset the zoom level to the default value (1.5)
    scale = 1.5;
    displayPage(currentPage);
  });
  

  function displayPage(pageNumber) {
    pdfInstance.getPage(pageNumber).then(function(page) {
      console.log('Page loaded');

      var viewport = page.getViewport({ scale: scale });

      // Set canvas dimensions to match the page
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Cancel the previous rendering task (if any)
      if (renderTask !== null) {
        renderTask.cancel();
      }

      // Prepare canvas context for rendering
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      // Render PDF page into canvas context
      renderTask = page.render(renderContext);
      renderTask.promise.then(function() {
        console.log('Page rendered');
      }).catch(function(error) {
        if (error.name === 'RenderingCancelledException') {
          console.log('Page rendering cancelled');
        } else {
          console.error('Error rendering page', error);
        }
      });
    });
  }

  function goToPage() {
    var pageNumberInput = document.getElementById('pageNumberInput').value;
    var pageNumber = parseInt(pageNumberInput);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      currentPage = pageNumber;
      displayPage(currentPage);
      goToTopWindow()
    }
  }

  function zoomIn() {
    scale += 0.1;
    displayPage(currentPage);
  }

  function zoomOut() {
    if (scale > 0.1) {
      scale -= 0.1;
      displayPage(currentPage);
    }
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
      pageNumInput.value = currentPage;
      goToTopWindow()
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      displayPage(currentPage);
      pageNumInput.value = currentPage;
      goToTopWindow()
    }
  }

  function goToTopWindow() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Add smooth scrolling behavior
    });
  }
  

//   let scrollTimer; // Timer variable to delay action

// container.addEventListener('wheel', function(e) {
//   const containerHeight = container.offsetHeight;
//   const contentHeight = container.scrollHeight;
//   const scrollTop = container.scrollTop;

//   clearTimeout(scrollTimer); // Clear previous timer

//   if (scrollTop + containerHeight >= contentHeight) {
//     // Scrolled to the bottom of the page
//     scrollTimer = setTimeout(goToNextPage, 300);
//   } else if (scrollTop === 0) {
//     // Scrolled to the top of the page
//     goToPreviousPage();
//   }
// });

  

});
