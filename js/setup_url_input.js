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


// sets up the button for if a new url is entered then it will try to figure out if it should treat it as a picture or a gif
    d3.select('#urlbut')
      .on('click', function(d){
        var linkinpu = d3.select('#linkin');
        var newlink = linkinpu.attr('text')
        settings.playing = false
        var linksplit = document.getElementById('linkin').value;
        console.log(linksplit, 'ender = ',  linksplit.split('.')[linksplit.split('.').length-1])
      //  console.log('update image with', (linkinpu[0][0].value).split('.')[linksplit.length -1])
        if( linksplit.split('.')[linksplit.split('.').length -1] !== 'gif'){
          console.log('thinks its not a gif')
          imgi.src = linksplit;
        }
        else{
        //  imgi.src = linkinpu[0][0].value;
          console.log('need to do gif stuff')
      //    settings.playing = true;
          settings.url.value = linksplit;
          loadGIF()
        }

      })



}


module.exports = setupInput;
