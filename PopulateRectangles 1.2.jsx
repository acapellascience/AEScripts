/*TIM'S AFTER EFFECTS SCRIPTS: Populate Rectangles With Footage.
    
    A UI for quickly placing videoclips in boxes. Select a sequence of rectangles and a sequence of clips.
    Pressing "populate" automatically populates the rectangles with the clips, gives them masks, parents the clip to the mask and the mask to the rectangle.
    Pressing "depopulate" removes the child layers leaving only the rectangles.*/

{
    function myScript(thisObj){
        function myScript_buildUI(thisObj) {
            var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Rectangle Populator", undefined, {resizeable: true, closeButton: true});
            
            res = "group{orientation:'column',\
            groupOne: Group{orientation:'row',\
            populateButton: Button{text:'Populate'},\
            depopulateButton: Button{text:'Depopulate'},\
             },\
            groupTwo: Panel{orientation:'row',\
            reRectangleButton: Button{text:'□'},\
            deleteText: StaticText{text:'Re-Rectangle Clip'},\
            },\
            groupThree: Panel{orientation:'row',\
            rotateFootageButton: Button{text:'⇄'},\
            deleteText: StaticText{text:'Cycle Clips'},\
            },\
            }"; 
            
             myPanel.grp = myPanel.add(res);
             
             //Defaults / Functionality
             myPanel.grp.groupTwo.reRectangleButton.size = [25,25];
             myPanel.grp.groupThree.rotateFootageButton.size = [25,25];
         
        //Populator Button
        myPanel.grp.groupOne.populateButton.onClick = function () {
            
             if(app.project.activeItem == undefined || app.project.activeItem == null){
                    alert("Please activate a comp");
                    return false;
                    }
                else {
                    populateRectangles();
                    }
                 }
        
        //Depopulator Button
        myPanel.grp.groupOne.depopulateButton.onClick = function () {
            
             if(app.project.activeItem == undefined || app.project.activeItem == null){
                    alert("Please activate a comp");
                    return false;
                    }
                else {
                    depopulateRectangles();
                    }
                 }
             
         //Rerectangle Button
        myPanel.grp.groupTwo.reRectangleButton.onClick = function () {
            
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

function preserve(inputArray){
//I don't really know if this function is necessary. But I think it is.

    var arrayLength = inputArray.length;
    var preservedArray = [];
    
    for(var i=0; i < arrayLength; ++i) {
        preservedArray[i] = inputArray[i];       
        }
    
    return preservedArray;

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

function getSize(rectangle){
    
    //var rectangle = comp.selectedLayers[0];
    var size = rectangle.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    var sizeValue = size.value;
    return sizeValue;
    
    }

/*function getPosition(rectangle){
    
    //var rectangle = comp.selectedLayers[0];
    var position = rectangle.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
    var positionValue = position.value;
    return positionValue;
    
    }

function setPosition(rectangle, positionValue){
    
    var position = rectangle.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
    position.setValue(positionValue);    
    
    }*/

function getLayerPosition(layer){
    
    var layerPosition = layer("Transform")("Position");
    var layerPositionValue = layerPosition.value;
    return layerPositionValue;
    
    }

function setPosition(rectangle, positionValue){
 
    var position = rectangle.property("Contents")("Rectangle 1")("Transform")("Position");
    position.setValue(positionValue);    
    
    }

function setSize(rectangle, sizeValue){
    
    var size = rectangle.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    size.setValue(sizeValue);
    
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

function transferFootages(peak1, peak2){
        var theseFootageLayers = getFootageLayers(peak1);
        var numberOfFootages = theseFootageLayers.length;
        for (var j=0; j < numberOfFootages; ++j){
           // alert("tansferring footage number " + j.toString());
            reRectangleFromKnown(theseFootageLayers[j],peak2);
            }
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

function testDescendantsFunction(layer){
    var descendants = getAllDescendants(layer);
    var numberOfDescendants = descendants.length;
    
    alert("This layer has a total of " + numberOfDescendants.toString() + " descendants");
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

function getLayerPosition(layer){
    
    var layerPosition = layer("Transform")("Position");
    var layerPositionValue = layerPosition.value;
    return layerPositionValue;
    
    }

function setLayerPosition(layer, positionValue){
    
    var layerPosition = layer("Transform")("Position");
    layerPosition.setValue(positionValue);
    
    }

//this function converts a shape position and a layer position into a center layer position and a correspondingly shifted shape position.
function consolidatePosition(shapeLayer){
 
    var shapePosition = getPosition(shapeLayer);
    var layerPosition = getLayerPosition(shapeLayer);
    
    var thisComp = shapeLayer.containingComp;
    var centrePosition = [thisComp.width/2, thisComp.height/2];

    var shift = [layerPosition[0] - centrePosition[0], layerPosition[1] - centrePosition[1]];

    shapePosition = [shapePosition[0] + shift[0], shapePosition[1] + shift[1]];

    setLayerPosition(shapeLayer, centrePosition);
    setPosition(shapeLayer, shapePosition);
    }