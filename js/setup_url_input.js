function setupInput (imgi) {

  var linkinput = d3.select('#linkin')
  linkinput.on('keydown', function (err, d, e) {
  //  var linkinput = d3.select('#linkin');
    if (err) {
      console.log('somehow there was an error on keydown it is, ', err)
    }
    console.log('and d on keydown is, ', d)
  })
  // console.log(linkinput.value)
  linkinput.attr('value', imgi.src)


  // this part handles users dropping files into the red box
  var dropbox = document.getElementById("filedragspot");
  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", drop, false);

  function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    handleFileDrop(files);

  }

  function handleFileDrop(filers) {
    var fileList = filers /* now you can work with the file list */
    console.log(filers)
    imgi.src = window.URL.createObjectURL(fileList[0])
  }

  // This is for when you upload a file from your filesystem
  var inputElement = document.getElementById('fileuploader')


  inputElement.addEventListener('change', handleFiles, false)


  function handleFiles (e) {

    console.log('nnoooooo')
    console.log('handling files', e)
    var fileList = this.files

    /* now you can work with the file list */
    console.log( fileList )
    imgi.src = window.URL.createObjectURL(fileList[0])

  }





}


module.exports = setupInput;
