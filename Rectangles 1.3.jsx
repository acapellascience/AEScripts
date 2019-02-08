/*TIM'S AFTER EFFECTS SCRIPTS: Rectangles 1.3
   This is a script for creating split-screen videos quickly. Create a rectangle, divide it up as you wish, and populate it with footage.
   You can depopulate populated rectangles, populate a rectangle with an existing footage layer, and quickly switch the locations of two or more clips.
   */

{
    function myScript(thisObj){
        function myScript_buildUI(thisObj) {
            var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Rectangles 1.3", undefined, {resizeable: true, closeButton: true});
            
            res = "group{orientation:'column',\
            groupOne: Group{orientation:'row',\
            RectButton: Button{text:'Create Default Rectangle'},\
             },\
            groupTwo: Panel{orientation:'row',\
            vertDivisionButton: Button{text:'--'},\
            horDivisionButton: Button{text:'|'},\
            mergeButton: Button{text:'Merge'},\
             },\
            groupThree: Group{orientation:'row',\
            populateButton: Button{text:'Populate'},\
            depopulateButton: Button{text:'Empty'},\
            reRectangleButton: Button{text:'□'},\
            rotateFootageButton: Button{text:'⇄'},\
            },\
            }"; 
            
             myPanel.grp = myPanel.add(res);
             
             //Defaults / Functionality
             myPanel.grp.groupTwo.vertDivisionButton.size = [25,25];
             myPanel.grp.groupTwo.horDivisionButton.size = [25,25];
             
             myPanel.grp.groupThree.populateButton.size = [55,25];
             myPanel.grp.groupThree.depopulateButton.size = [45,25];
             myPanel.grp.groupThree.reRectangleButton.size = [25,25];
             myPanel.grp.groupThree.rotateFootageButton.size = [25,25];
             
             //mouseover
             
             myPanel.grp.groupOne.RectButton.onmouseover = function (){
                 
                 }
        
        //Default Rectangle Button
        myPanel.grp.groupOne.RectButton.onClick = function () {
            
             if(app.project.activeItem == undefined || app.project.activeItem == null){
                    alert("Please select a comp");
                    return false;
                    }
                else {
                    createDefaultRectangle();
                    }
                 }
        
        //Right Rectangle Button
      /*  myPanel.grp.groupOne.rightRectButton.onClick = function () {
            
             if(app.project.activeItem == undefined || app.project.activeItem == null){
                    alert("Please select a comp");
                    return false;
                    }
                else {
                    createRightRectangle();
                    }
                 }*/
             
             // Divide Vertically Button     
             myPanel.grp.groupTwo.vertDivisionButton.onClick = function () {
                 
                 divScript(true);
                 
                 }
             //Divide Horizontally Button 
             myPanel.grp.groupTwo.horDivisionButton.onClick = function () {
                 
                 divScript(false);
                  
                 }  
              //Merge Button
              myPanel.grp.groupTwo.mergeButton.onClick = function () {
                   if(app.project.activeItem.selectedLayers[0] == undefined || app.project.activeItem.selectedLayers[0] == null){
                    alert("Please select one or more layers");  
                    }
                
                else {
                      var myComp = app.project.activeItem;
                      mergeRectangles(myComp);

                    }
                 }  
             
                     //Populator Button
        myPanel.grp.groupThree.populateButton.onClick = function () {
            
             if(app.project.activeItem == undefined || app.project.activeItem == null){
                    alert("Please activate a comp");
                    return false;
                    }
                else {
                    populateRectangles();
                    }
                 }
        
        //Depopulator Button
        myPanel.grp.groupThree.depopulateButton.onClick = function () {
            
             if(app.project.activeItem == undefined || app.project.activeItem == null){
                    alert("Please activate a comp");
                    return false;
                    }
                else {
                    depopulateRectangles();
                    }
                 }
             
         //Rerectangle Button
        myPanel.grp.groupThree.reRectangleButton.onClick = function () {
            
             if(app.project.activeItem == undefined || app.project.activeItem == null){
                    alert("Please activate a comp");
                    return false;
                    }
                else {
                    reRectangle();
                    }
                 }
             
                      //Rerectangle Button
        myPanel.grp.groupThree.rotateFootageButton.onClick = function () {
            
             if(app.project.activeItem == undefined || app.project.activeItem == null){
                    alert("Please activate a comp");
                    return false;
                    }
                else {
                    rotateFootage();
                    }
                 }
             
             
             myPanel.layout.layout(true);
             
             return myPanel;
            
            }
        
        var myScriptPal = myScript_buildUI(thisObj);

        if(myScriptPal != null && myScriptPal instanceof Window){
            myScriptPal.center();
            myScriptPal.show();
            }
        }
   myScript(this);
}



function changeFill(rectangle, color, isFilled){
    
    var rectangleFill = rectangle("Contents")("Rectangle 1")("Contents")("Fill 1");
    var currentColor = rectangleFill("Color");
    
    rectangleFill.enabled = isFilled;
    currentColor.setValue(color);

    }

function changeStrokeWidth(rectangle, size){
    
    var currentWidth = rectangle("Contents")("Rectangle 1")("Contents")("Stroke 1")("Stroke Width");
    currentWidth.setValue(size);
    
    }
function createDefaultRectangle(){
    
    app.beginUndoGroup("Execute Our Code");    
    
    var layerName = "Rectangle";
    var standardSize = [1880,1034];
    var standardPosition = [0,0];

  //  makeRectangle(standardLayerName, theLayer, standardWidth, standardHeight, standardStrokeWidth, filledOrNot, standardFillColor, standardStrokeColor, standardPosition);
    
    var leftRectangle = makeRectSimple(layerName, standardSize, standardPosition);

    app.endUndoGroup();

    }


function createLeftRectangle(){
    
    app.beginUndoGroup("Execute Our Code");    
    
    var layerName = "Left";
    var standardSize = [362,1034];
    var standardPosition = [-759,0];

  //  makeRectangle(standardLayerName, theLayer, standardWidth, standardHeight, standardStrokeWidth, filledOrNot, standardFillColor, standardStrokeColor, standardPosition);
    
    var leftRectangle = makeRectSimple(layerName, standardSize, standardPosition);

    app.endUndoGroup();

    }

function createRightRectangle(){
    
   app.beginUndoGroup("Execute Our Code");    
    
    var layerName = "Right";
    var standardSize = [362,1034];
    var standardPosition = [759,0];

  //  makeRectangle(standardLayerName, theLayer, standardWidth, standardHeight, standardStrokeWidth, filledOrNot, standardFillColor, standardStrokeColor, standardPosition);
    
    var leftRectangle = makeRectSimple(layerName, standardSize, standardPosition);

    app.endUndoGroup();

    }
function consolidatePosition(shapeLayer){
    
    //this function converts a shape position and a layer position into a center layer position and a correspondingly shifted shape position.
 
    var shapePosition = getPosition(shapeLayer);
    var layerPosition = getLayerPosition(shapeLayer);
    
    var thisComp = shapeLayer.containingComp;
    var centrePosition = [thisComp.width/2, thisComp.height/2];

    var shift = [layerPosition[0] - centrePosition[0], layerPosition[1] - centrePosition[1]];

    shapePosition = [shapePosition[0] + shift[0], shapePosition[1] + shift[1]];

    setLayerPosition(shapeLayer, centrePosition);
    setPosition(shapeLayer, shapePosition);
    }

function depopulateRectangles(){
    
    app.beginUndoGroup("Depopulate");
    
    var selectedLayers = preserve(app.project.activeItem.selectedLayers);
    var peakLayers = getPeakLayers(selectedLayers);

    var numberOfPeaks = peakLayers.length;
    
        for (var i = 0; i < numberOfPeaks; ++i){
              removeDescendants(peakLayers[i]);
           }

    
    app.endUndoGroup;
    
    }


function divScript(verticality){
    
      if(app.project.activeItem.selectedLayers[0] == undefined || app.project.activeItem.selectedLayers[0] == null){
                    alert("Please select a layer");  
              }
                
       else if(app.project.activeItem.selectedLayers[1] == undefined || app.project.activeItem.selectedLayers[1] == null){
                 var myComp = app.project.activeItem;
                 splitRectangle(myComp, verticality);

               }
       else {
           
                 var myComp = app.project.activeItem;
                 selectedLayers = myComp.selectedLayers;
                 numberOfLayers = selectedLayers.length;
                 var newRectangle = mergeRectangles(myComp);
                 splitMultiple(newRectangle, numberOfLayers +1, verticality);
           //alert("Multiple Layers Selected");
           
           }
    }

function getAllDescendants(layer){
   // alert("do we get here more than once?");
    var comp = layer.containingComp;
    var allLayers = comp.layers;
    var numberOfLayers = allLayers.length;
    var descendants = [];
    
    //for some BIZARRE reason, comp.layers objects start their indices from 1 instead of 0.
    for (var i = 1; i <= numberOfLayers; ++i){
       // alert("about to see if " + allLayers[i].name + "is a descendant of " + layer.name);
        var thisLayer = allLayers[i];
        
        if (isDescendantOf(thisLayer,layer)){
            var dummyArray = [thisLayer];
            descendants = descendants.concat(dummyArray);
            }
        
        }
      //  alert("seeing if we get here once");
    return descendants;
    }

function getFirstFootageLayer(arrayOfLayers){
    
   var footageLayer = null;
   var i = 0;
   
   while (i < arrayOfLayers.length && footageLayer == null)
   {
       if (arrayOfLayers[i].source instanceof FootageItem || arrayOfLayers[i].source instanceof CompItem){
           
           footageLayer = arrayOfLayers[i];
           
           }
       
       ++i;
       }

   return footageLayer;
    }

function getFirstRectangleLayer(arrayOfLayers){
    
    var rectangleLayer = null;
    var i = 0;
   
   while (i < arrayOfLayers.length && rectangleLayer == null)
   {
       if (arrayOfLayers[i] instanceof ShapeLayer){
           
           rectangleLayer = arrayOfLayers[i];
           
           }
       
       ++i;
       }
   
   return rectangleLayer;
    
    }

function getFootageLayers(peakLayer){
    children = getAllDescendants(peakLayer);
    footageLayers = [];
    for (var i = 0; i < children.length; ++i){
          if (children[i].source instanceof FootageItem || children[i].source instanceof CompItem){
           
               footageLayers = footageLayers.concat([children[i]]);
           
              }

        }
    
    return footageLayers;
    }


function getLayerPosition(layer){
    
    var layerPosition = layer("Transform")("Position");
    var layerPositionValue = layerPosition.value;
    return layerPositionValue;
    
    }

function getPosition(rectangle){
    
    //var rectangle = comp.selectedLayers[0];
    var position = rectangle.property("Contents")("Rectangle 1")("Transform")("Position");
    var positionValue = position.value;
    return positionValue;
    
    }

function getPeakLayers(selectedLayers){
     
         var peakLayers = [];
         var numberOfLayers = selectedLayers.length;
    
    for (var i = 0; i < numberOfLayers; ++i){
        
        var thisLayer = selectedLayers[i];
        
        if (thisLayer.parent == null){
            
            peakLayers = peakLayers.concat([thisLayer]);
            
            }
        
        }
    return peakLayers;
    }


function getSize(rectangle){
    
    //var rectangle = comp.selectedLayers[0];
    var size = rectangle.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    var sizeValue = size.value;
    return sizeValue;
    
    }

function isDescendantOf(testLayer, parentLayer){
    var testComp = testLayer.containingComp;
    var parentComp = parentLayer.containingComp;
    //alert("we got here");
    
    if (testComp != parentComp){
        alert("These layers are not in the same comp!");
        return false
        }
    else {
        var latestParent = testLayer.parent;
        
        while (latestParent != null && latestParent != parentLayer){
            latestParent = latestParent.parent;
           // alert("we got here");
            }
        if (latestParent == null){
            return false;
            }
        else {
           // alert("found one!");
            return true;
            }
        }
    }


function makeMaskFromRectangle(rectangle){
    
    var mask = rectangle.duplicate();
    var maskName = rectangle.name + " mask";
    
    changeFill(mask, [1,1,1], true);
        
    changeStrokeWidth(mask, 0);
    
    mask.name = maskName;
    
    mask.moveAfter(rectangle);
    
    mask.parent = rectangle;    
    
     rectangle.populated = true;
     mask.populator = true;
     mask.populated = false;
    
    return mask;
    
    }

function makeRectangle (layerNamePass, layerPass, widthPass, heightPass, strokeWidthPass, isFilled, fillColorPass, strokeColorPass, positionPass){

        var myRectSize = [widthPass, heightPass]; 
        var myFillColor = fillColorPass; 
        var myStrokeColor = strokeColorPass;
        var myStrokeWidth = strokeWidthPass;
        var myShapeLayer = layerPass;
        var myPosition = positionPass;
      
        
        var myShapeLayerContents = myShapeLayer.property("ADBE Root Vectors Group"); //define a variable for the contents of the layer
        
        var myShapeGroup = myShapeLayerContents.addProperty("ADBE Vector Group"); //add a vector group to the contents
        myShapeGroup.name = "Rectangle 1";
        
        var myRect = myShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect"); //add a rectangle to the group
        myRect.property("ADBE Vector Rect Size").setValue(myRectSize); //set rectangle size
        //myRect.property("ADBE Vector Rect Position").setValue(myPosition); //set rectanngle position (relative to anchor)
        
        myShapeGroup("Transform")("Position").setValue(positionPass);
        
        var myShapeStroke = myShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke"); //add a stroke to the rectangle
        myShapeStroke.property("ADBE Vector Stroke Width").setValue(myStrokeWidth); //set the width of the stroke
        myShapeStroke.property("ADBE Vector Stroke Color").setValue(myStrokeColor); //set the color of the stroke
        
        var myShapeFill = myShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill"); //add a fill to the rectangle        
        myShapeFill.property("ADBE Vector Fill Color").setValue(myFillColor); //set the color of the fill
       
       if (!isFilled) {
       
        myShapeFill.enabled = false;

        }
  
        myShapeLayer.name = layerNamePass; //rename the layer to your chosen name
        
        return myShapeLayer;
        
        }


function makeRectSimple(layerName, size, position){
    
    var theComp = app.project.activeItem; //read in the active comp
    var theLayer = theComp.layers.addShape(); //add a shape layer in the comp
    var width = size[0];
    var height = size[1];
    var standardFillColor = [0,0,0];
    var standardStrokeColor = [0,0,0];
    var standardStrokeWidth = 4;
    var filledOrNot = false;
    
    madeRectangle = makeRectangle(layerName, theLayer, width, height, standardStrokeWidth, filledOrNot, standardFillColor, standardStrokeColor, position);
    
    return madeRectangle;
    }

function mergeRectangles(inputComp){
    
    app.beginUndoGroup("Merge");

    //
    selectedLayers = inputComp.selectedLayers;
    numberOfLayers = selectedLayers.length;
    //alert("you have " + numberOfLayers +" layers currently selected.");
    
    //get extremes
    
        var myLayer = selectedLayers[0];
        consolidatePosition(myLayer);
        var finalLayer = myLayer;
        var sizeValue = getSize(myLayer);
        var positionValue = getPosition(myLayer);
        
        //myLayer.remove();
        
        var extremes = [[positionValue[0] - sizeValue[0]/2, positionValue[0] + sizeValue[0]/2], [positionValue[1] - sizeValue[1]/2, positionValue[1] + sizeValue[1]/2]];
    
    for (i = 1; i < numberOfLayers; ++i){
        
        myLayer = selectedLayers[i];
        consolidatePosition(myLayer);
        sizeValue = getSize(myLayer);
        positionValue = getPosition(myLayer);
        currentName = myLayer.name;
        //catNames = catNames + ", " + currentName;
        //delete old layer after use
        myLayer.remove();
        
        var localExtremes = [[positionValue[0] - sizeValue[0]/2, positionValue[0] + sizeValue[0]/2], [positionValue[1] - sizeValue[1]/2, positionValue[1] + sizeValue[1]/2]];
        
        if (localExtremes[0][0] < extremes[0][0]) extremes[0][0] = localExtremes[0][0];
        if (localExtremes[0][1] > extremes[0][1]) extremes[0][1] = localExtremes[0][1];
        if (localExtremes[1][0] < extremes[1][0]) extremes[1][0] = localExtremes[1][0];
        if (localExtremes[1][1] > extremes[1][1]) extremes[1][1] = localExtremes[1][1];
        }
    
        // alert("your extremes are " + extremes.toString());
    
    //make a rectangle with the extremes
    
    var newRectPosition = [(extremes[0][0]+extremes[0][1])/2, (extremes[1][0]+extremes[1][1])/2];
    var newRectSize = [extremes[0][1]-extremes[0][0], extremes[1][1]-extremes[1][0]];
    var layerName = /*catNames + */"Merge";
    
    //finalPosition.setValue(newRecPosition);
    //finalSize.setValue(newRectSize);
    //finalLayer.name = layerName;
    
   // var finalLayerSize = finalLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
  //  finalLayerSize.setValue(newRectSize);
  //  var finalLayerPosition = finalLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
  //  finalLayerPosition.setValue(newRectPosition);
  
    setSize(finalLayer, newRectSize);
    setPosition(finalLayer, newRectPosition);
    
    finalLayer.name = "Merge";
    //var mergedRectangle = makeRectSimple(layerName, newRectSize, newRectPosition);

    return finalLayer;
    //return mergedRectangle;
    
    app.endUndoGroup();
    
    }

function populateMask(mask, footageLayer){
    
    footageLayer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
    footageLayer.parent = null;
    var footageSize = [footageLayer.width, footageLayer.height];
    var maskSize = getSize(mask);
    
   
    //var footageAspect = footageSize[0]/footageSize[1];
    //var maskAspect = maskSize[0]/maskSize[1];
    
    var rescale = Math.max(maskSize[0]/footageSize[0], maskSize[1]/footageSize[1]);
    
    var currentFootagePosition = footageLayer("Transform")("Position");

    currentFootagePosition.setValue([960,540]+getPosition(mask));
    
    var currentScale = footageLayer("Transform")("Scale");
    
    currentScale.setValue([100,100]*rescale);
    
 //alert("we got here");        
    
    footageLayer.moveAfter(mask);
    footageLayer.trackMatteType = TrackMatteType.ALPHA;
    
    footageLayer.parent = mask;
    
     mask.populated = true;

     footageLayer.populator = true;
     footageLayer.populated = false;
    
    }


function populateRectangles(){
    
    app.beginUndoGroup("Populate");
    
    var allLayers = app.project.activeItem.layers;
    var selectedLayers = app.project.activeItem.selectedLayers;
    var selectedFootage = app.project.selection;
    
       // alert("You have " + numberOfClips.toString() + " clips and " + numberOfLayers.toString() + " layers selected.");
       
   var preservedLayers = preserve(selectedLayers);
   var preservedFootage = preserve(selectedFootage);
    
   var numberOfLayers = preservedLayers.length;
   var numberOfClips = preservedFootage.length;
    
   //alert("You have " + numberOfClips.toString() + " clips and " + numberOfLayers.toString() + " layers selected.");
   
   //duplicate the rectangles and change their properties
   
   var numberOfPairs = Math.min(numberOfLayers, numberOfClips);
   
   var masks = [];
   var footageLayers = [];
   
   for (var i = 0; i < numberOfPairs; ++i){
       
       consolidatePosition(preservedLayers[i]);
       
       preservedLayers[i].populator = false;
       
       masks[i] = makeMaskFromRectangle(preservedLayers[i]);
       footageLayers[i] = allLayers.add(preservedFootage[i]);
       populateMask(masks[i], footageLayers[i]);
       masks[i].name = footageLayers[i].name + " Mask";
       preservedLayers[i].name = footageLayers[i].name + " Border";
       }
   
   var numberOfMasks = masks.length;
   


   app.endUndoGroup();
    
    }

function preserve(inputArray){
//I don't really know if this function is necessary. But I think it is.

    var arrayLength = inputArray.length;
    var preservedArray = [];
    
    for(var i=0; i < arrayLength; ++i) {
        preservedArray[i] = inputArray[i];       
        }
    
    return preservedArray;

}

function removeDescendants(thisLayer){
    
                //alert("we got to removing descendants");
    
            var theseDescendants = getAllDescendants(thisLayer);
            var numberOfDescendants = theseDescendants.length;
            
           // alert(numberOfDescendants.toString() + " descendants");
            
            for (var j = 0; j< theseDescendants.length; ++j){
                theseDescendants[j].remove();
                
                }
            
            thisLayer.populated = false;
            
            return true;
            
            }
        
function reRectangle(){
    
    app.beginUndoGroup("Re-Rectangle Clip");
  
    var allLayers = app.project.activeItem.layers;
    var selectedLayers = app.project.activeItem.selectedLayers;
           
   var preservedLayers = preserve(selectedLayers);
    
   var numberOfLayers = preservedLayers.length;
   
   var footageLayer = getFirstFootageLayer(preservedLayers);
  
   if (footageLayer == null) {
       alert("No footage layer selected.");
       return false;
       }
   else{
       
       var rectangleLayer = getFirstRectangleLayer(preservedLayers);
       
        if(rectangleLayer == null){
            alert("No rectangle selected");
            return false;
            }
        else{

            reRectangleFromKnown(footageLayer, rectangleLayer);
            
            return true;
            }
   
   }
   
    app.endUndoGroup();

    }

function reRectangleFromKnown(footageLayer, rectangleLayer){
            
            var newMask = makeMaskFromRectangle(rectangleLayer);
            if(footageLayer.parent != null && footageLayer.parent.parent != null) {
                footageLayer.parent.parent.name = "Free Rectangle";
                }
            if(footageLayer.parent != null) {
                footageLayer.parent.remove();
                }
            populateMask(newMask, footageLayer);
            
            newMask.name = footageLayer.name + " Mask";
            rectangleLayer.name = footageLayer.name + " Border";
    }

function rotateFootage(){
    app.beginUndoGroup("Cycle Footage");
    
    var layers = app.project.activeItem.layers;
    var selectedLayers = app.project.activeItem.selectedLayers;

    var peakLayers = getPeakLayers(selectedLayers);
    
    var trueNumberOfPeaks = peakLayers.length; 
    
     if (peakLayers.length < 2){
        alert("Not enough layer groups selected");
        return false
        }
    
    else{
    
        //create a dummy rectangle to store the last rectangle's footage.
    
        var dummyRectangle = peakLayers[trueNumberOfPeaks - 1].duplicate();
    
        //add this rectangle to the list of peak rectangles, so the cycle can be done all at once.
    
        peakLayers = peakLayers.concat([dummyRectangle]);
        
      //  alert("we got here");
    
        for (var i = trueNumberOfPeaks; i >= 0; --i){
        
          //  alert("loop variable is now " + i.toString());
            transferFootages(peakLayers[i],peakLayers[i+1]);

            }
       // alert("hang is after this point");
    
        transferFootages(dummyRectangle, peakLayers[0]);
        dummyRectangle.remove();
        
        return true;
    }
    
    app.endUndoGroup();
    }

function setLayerPosition(layer, positionValue){
    
    var layerPosition = layer("Transform")("Position");
    layerPosition.setValue(positionValue);
    
    }
    
function setPosition(rectangle, positionValue){
 
    var position = rectangle.property("Contents")("Rectangle 1")("Transform")("Position");
    position.setValue(positionValue);    
                                 //     alert("we got here");
    }

function setSize(rectangle, sizeValue){
    
    var size = rectangle.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    size.setValue(sizeValue);
    
    }


function splitMultiple(rectangle, pieces, verticality){
    

   /* var rectangle = inputComp.selectedLayers[0];
    var size = rectangle.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");  
    var sizeValue = size.value;   
    var position = rectangle.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
    var positionValue = position.value;    */
    
            //alert("we made it to here");  
    
    var sizeValue = getSize(rectangle);
    var positionValue = getPosition(rectangle);
    var name = rectangle.name;
    //alert("name is " + name);    
    
    var rectangleStorage = [];
    
           //make the rectangles   
    for (i = 0; i < pieces; ++i){
        
        thisRectangle = rectangle.duplicate();
        
        if (verticality == true){
            
            var newYPosition = positionValue[1] + sizeValue[1]*((2*i+1)/(2*pieces)-1/2);            
            var thisRectPosition = [positionValue[0], newYPosition];
            setPosition(thisRectangle, thisRectPosition);
            
            var newVertSize = sizeValue[1]/pieces;
            var newSize = [sizeValue[0], newVertSize];
            setSize(thisRectangle, newSize);
            
                     
            }
        
        else {
            
            var newXPosition = positionValue[0] + sizeValue[0]*((2*i+1)/(2*pieces)-1/2);            
            var thisRectPosition = [newXPosition,positionValue[1]];
            setPosition(thisRectangle, thisRectPosition);
            
            var newHorSize = sizeValue[0]/pieces;
            var newSize = [newHorSize, sizeValue[1]];
            setSize(thisRectangle, newSize);
            
            }
        
        rectangleStorage[i] = thisRectangle;
        //alert("this line worked")
        }
    
    //delete old rectangle
    rectangle.remove();
    
    //rename and select new rectangles
    for (i = 0; i < pieces; ++i) {
        rectangleStorage[i].name = name + "_" + i;
        rectangleStorage[i].selected = true;
        }
    
          //  alert(" loops completed");
          
    
    //alert("You successfully made " + rectangleStorage.size.toString() + " rectangles");
    //alert("the size and position are " + sizeValue.toString() + " and " + positionValue.toString());
}

function splitRectangle(inputComp, isVertical){
    
    app.beginUndoGroup("Split");

    // get the variables
    var myLayer = inputComp.selectedLayers[0];
  //  var myLayer = app.project.activeItem.selectedLayers[0];
  //  var size = myLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    var sizeValue = getSize(myLayer);
    //var position = myLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
    var positionValue = getPosition(myLayer);
    
    var upperRectLayer = myLayer.duplicate();    
   // var upperRectPosition = upperRectLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
   // var upperRectSize = upperRectLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");

    var lowerRectLayer = myLayer.duplicate();   
//    var lowerRectPosition = lowerRectLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
 //   var lowerRectSize = lowerRectLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    
    //vertical case
     if (isVertical) {
    
        var vertPositionShift = sizeValue[1]/4;
        var newHeight = sizeValue[1]/2;
    
        var newUpperPosition = positionValue - [0, vertPositionShift];
        var newLowerPosition = positionValue + [0, vertPositionShift];
        var newSize = [sizeValue[0], newHeight];
    

        
     //   upperRectPosition.setValue(newUpperPosition);
    //    lowerRectPosition.setValue(newLowerPosition);
      //  upperRectSize.setValue(newSize);
     //   lowerRectSize.setValue(newSize);
    
        upperRectLayer.name = myLayer.name + " ↑";
        lowerRectLayer.name = myLayer.name + " ↓";
    
        }
    //horizontal case
     else {
    
        var horizPositionShift = sizeValue[0]/4;
        var newWidth = sizeValue[0]/2;
    
        var newUpperPosition = positionValue - [horizPositionShift, 0];
        var newLowerPosition = positionValue + [horizPositionShift, 0];
        var newSize = [newWidth, sizeValue[1]];

   ///     upperRectPosition.setValue(newUpperPosition);
    //    lowerRectPosition.setValue(newLowerPosition);
    //    upperRectSize.setValue(newSize);
    //    lowerRectSize.setValue(newSize);
    
        upperRectLayer.name = myLayer.name + " ←";
        lowerRectLayer.name = myLayer.name + " →";
    
        }
    
        setPosition(upperRectLayer, newUpperPosition);
        setPosition(lowerRectLayer, newLowerPosition);
        setSize(upperRectLayer, newSize);
        setSize(lowerRectLayer, newSize);   
    
    myLayer.remove();    
    
    upperRectLayer.selected = true; 
    lowerRectLayer.selected = true;

    app.endUndoGroup();
    
   // var string = "the shift is " + vertPositionShift.toString();
  //  alert(string);
    
    return [upperRectLayer, lowerRectLayer];
    }


function tellSizeAndPosition(inputComp){
    
    var myLayer = inputComp.selectedLayers[0];
  //  var myLayer = app.project.activeItem.selectedLayers[0];
    var size = myLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    var sizeValue = size.value;
    var position = myLayer("Contents")("Rectangle 1")("Transform")("Position");
    var positionValue = position.value;
    var string = "the size is [" + sizeValue.toString() + "] and its position is [" + positionValue.toString() + "]";
    alert(string);
    }

function testDescendantsFunction(layer){
    var descendants = getAllDescendants(layer);
    var numberOfDescendants = descendants.length;
    
    alert("This layer has a total of " + numberOfDescendants.toString() + " descendants");
    }

function transferFootages(peak1, peak2){
        var theseFootageLayers = getFootageLayers(peak1);
        var numberOfFootages = theseFootageLayers.length;
        for (var j=0; j < numberOfFootages; ++j){
           // alert("tansferring footage number " + j.toString());
            reRectangleFromKnown(theseFootageLayers[j],peak2);
            }
    }