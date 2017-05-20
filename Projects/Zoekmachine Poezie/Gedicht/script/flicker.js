/*
id (Optional)
A single user ID. This specifies a user to fetch for.
ids (Optional)
A comma delimited list of user IDs. This specifies a list of users to fetch for.
tags (Optional)
A comma delimited list of tags to filter the feed by.
tagmode (Optional)
Control whether items must have ALL the tags (tagmode=all), or ANY (tagmode=any) of the tags. Default is ALL.
format (Optional)
The format of the feed. See the feeds page for feed format information. Default is Atom 1.0.
lang (Optional)
The display language for the feed. See the feeds page for feed language information. Default is US English (en-us).
*/

// Get the flickr stream
$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags='cat,sleep,tree'&tagmode=any&format=json&jsoncallback=?",
function(data){
 
//http://www.maxnov.com/getimagedata/
    
    
    // For each image
  $.each(data.items, function(i,item){
    $.getImageData({
      url: item.media.m, // This is the URL of the flickr image
      success: analyseAndDraw, // Run this function when image has been fetched
      error: function(xhr, text_status){
        console.log(text_status);// Handle your error here
      }
    });
  });
 
});
 
// This creates a canvas, draws the image on to it, gets the average colour of the image and then adds
// the image to the DOM with the average colour as a background colour to its container
function analyseAndDraw(image) {
  // Create the canvas and context
  var can = document.createElement('canvas');
  var ctx = can.getContext('2d');
 
  // Set the canvas dimensions
  $(can).attr('width', image.width);
  $(can).attr('height', image.height);
 
  // Draw the image to the canvas
  ctx.drawImage(image, 0, 0, image.width, image.height);
 
  // Get the image data
  var image_data = ctx.getImageData(0, 0,  image.width, image.height);
  var image_data_array = image_data.data;
  var image_data_array_length = image_data_array.length;
 
  // Array to hold the average totals
  var a=[0,0,0];
 /*
  // Accumulate the pixel colours
  for (var i = 0; i < image_data_array_length; i += 4){
    a[0]+=image_data_array[i];
    a[1]+=image_data_array[i+1];
    a[2]+=image_data_array[i+2];
  }
 
  // Divide by number total pixels
  a[0] = Math.round(a[0]/=(image_data_array_length/3)); // R
  a[1] = Math.round(a[1]/=(image_data_array_length/3)); // G
  a[2] = Math.round(a[2]/=(image_data_array_length/3)); // B
 */
    a[0] = image_data_array[0];
    a[1] = image_data_array[1];
    a[2] = image_data_array[2];

 
  // Create the container, set its background colour and add it to the DOM
  var imageContainer = $('<div style="background-color:rgb('+a[0]+','+a[1]+','+a[2]+')"></div>');
  $(".images").append(imageContainer);
 
  // Insert the image to the container
  $(imageContainer).append(image);
}