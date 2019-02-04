/*TIM'S AFTER EFFECTS SCRIPTS: Rectangle Splitter
    
    This is a little ScriptUI tool to generate some default rectangles. and to split and merge rectangles to quickly generate starting grids for multi-part videos.
    
    It has some quirks if you use it on drawn rectangles, but works well if you stay within the tool. To create a full-screen rectangle, gemerate one left and one right, then merge.*/

{
    function myScript(thisObj){
        function myScript_buildUI(thisObj) {
            var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Rectangle Splitter 1.0", undefined, {resizeable: true, closeButton: true});
            
            res = "group{orientation:'column',\
            groupOne: Group{orientation:'row',\
            leftRectButton: Button{text:'Default Left'},\
            rightRectButton: Button{text:'Default Right'},\
             },\
            groupTwo: Panel{orientation:'row',\
            vertDivisionButton: Button{text:'--'},\
            deleteText: StaticText{text:'Divide Vertically'},\
            },\
            groupThree: Panel{orientation:'row',\
            horDivisionButton: Button{text:'|'},\
            deleteText: StaticText{text:'Divide Horizontally'},\
            },\
            groupFour: Group{orientation:'row',\
            mergeButton: Button{text:'Merge Selected'},\
             },\
            }"; 
            
             myPanel.grp = myPanel.add(res);
             
             //Defaults / Functionality
             myPanel.grp.groupTwo.vertDivisionButton.size = [25,25];
             myPanel.grp.groupThree.horDivisionButton.size = [25,25];
        
        //Left Rectangle Button
        myPanel.grp.groupOne.leftRectButton.onClick = function () {
            
             if(app.project.activeItem == undefined || app.project.activeItem == null){
                    alert("Please select a comp");
                    return false;
                    }
                else {
                    createLeftRectangle();
                    }
                 }
        
        //Right Rectangle Button
        myPanel.grp.groupOne.rightRectButton.onClick = function () {
            
             if(app.project.activeItem == undefined || app.project.activeItem == null){
                    alert("Please select a comp");
                    return false;
                    }
                else {
                    createRightRectangle();
                    }
                 }
             
             // Divide Vertically Button     
             myPanel.grp.groupTwo.vertDivisionButton.onClick = function () {
                 
                 divScript(true);
                 
                 }
             //Divide Horizontally Button 
             myPanel.grp.groupThree.horDivisionButton.onClick = function () {
                 
                 divScript(false);
                  
                 }  
              //Merge Button
              myPanel.grp.groupFour.mergeButton.onClick = function () {
                   if(app.project.activeItem.selectedLayers[0] == undefined || app.project.activeItem.selectedLayers[0] == null){
                    alert("Please select one or more layers");  
                    }
                
                else {
                      var myComp = app.project.activeItem;
                      mergeRectangles(myComp);

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

function makeRectangle (layerNamePass, layerPass, widthPass, heightPass, strokeWidthPass, isFilled, fillColorPass, strokeColorPass, positionPass)

    {

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
        myRect.property("ADBE Vector Rect Position").setValue(myPosition); //set rectanngle position (relative to anchor)
        
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


function splitRectangle(inputComp, isVertical){
    
    app.beginUndoGroup("Execute Our Code");

    // get the variables
    var myLayer = inputComp.selectedLayers[0];
  //  var myLayer = app.project.activeItem.selectedLayers[0];
    var size = myLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    var sizeValue = size.value;
    var position = myLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
    var positionValue = position.value;
    
    var upperRectLayer = myLayer.duplicate();    
    var upperRectPosition = upperRectLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
    var upperRectSize = upperRectLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");

    var lowerRectLayer = myLayer.duplicate();   
    var lowerRectPosition = lowerRectLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
    var lowerRectSize = lowerRectLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    
    //vertical case
     if (isVertical) {
    
        var vertPositionShift = sizeValue[1]/4;
        var newHeight = sizeValue[1]/2;
    
        var newUpperPosition = positionValue - [0, vertPositionShift];
        var newLowerPosition = positionValue + [0, vertPositionShift];
        var newSize = [sizeValue[0], newHeight];
    
        upperRectPosition.setValue(newUpperPosition);
        lowerRectPosition.setValue(newLowerPosition);
        upperRectSize.setValue(newSize);
        lowerRectSize.setValue(newSize);
    
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
    
        upperRectPosition.setValue(newUpperPosition);
        lowerRectPosition.setValue(newLowerPosition);
        upperRectSize.setValue(newSize);
        lowerRectSize.setValue(newSize);
    
        upperRectLayer.name = myLayer.name + " ←";
        lowerRectLayer.name = myLayer.name + " →";
    
        }
    
    
    myLayer.remove();    
    
    upperRectLayer.selected = true; 
    lowerRectLayer.selected = true;

    app.endUndoGroup();
    
   // var string = "the shift is " + vertPositionShift.toString();
  //  alert(string);
    
    return [upperRectLayer, lowerRectLayer];
    }

function mergeRectangles(inputComp){
    
    app.beginUndoGroup("Execute Our Code");

    //
    selectedLayers = inputComp.selectedLayers;
    numberOfLayers = selectedLayers.length;
    //alert("you have " + numberOfLayers +" layers currently selected.");
    
    //get extremes
    
        var myLayer = selectedLayers[0];
        var finalLayer = myLayer;
        var currentSize = myLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
        //var finalSize = currentSize;
        var sizeValue = currentSize.value;
        var currentPosition = myLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
        //var finalPosition = currentPosition;
        var positionValue = currentPosition.value;
        //var currentName = myLayer.name;
        //var catNames = currentName
        //myLayer.remove();
        
        var extremes = [[positionValue[0] - sizeValue[0]/2, positionValue[0] + sizeValue[0]/2], [positionValue[1] - sizeValue[1]/2, positionValue[1] + sizeValue[1]/2]];
    
    for (i = 1; i < numberOfLayers; ++i){
        
        myLayer = selectedLayers[i];
        currentSize = myLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
        sizeValue = currentSize.value;
        currentPosition = myLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
        positionValue = currentPosition.value;
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
    
    var finalLayerSize = finalLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    finalLayerSize.setValue(newRectSize);
    var finalLayerPosition = finalLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
    finalLayerPosition.setValue(newRectPosition);
    
    finalLayer.name = "Merge";
    //var mergedRectangle = makeRectSimple(layerName, newRectSize, newRectPosition);

    return finalLayer;
    //return mergedRectangle;
    
    app.endUndoGroup();
    
    }

function makeRectSimple(layerName, size, position){
    
    var theComp = app.project.activeItem; //read in the active comp
    var theLayer = theComp.layers.addShape(); //add a shape layer in the comp
    var width = size[0];
    var height = size[1];
    var standardFillColor = [0,0,0];
    var standardStrokeColor = [0,0,0];
    var standardStrokeWidth = 3;
    var filledOrNot = false;
    
    madeRectangle = makeRectangle(layerName, theLayer, width, height, standardStrokeWidth, filledOrNot, standardFillColor, standardStrokeColor, position);
    
    return madeRectangle;
    }

function tellSizeAndPosition(inputComp){
    
    var myLayer = inputComp.selectedLayers[0];
  //  var myLayer = app.project.activeItem.selectedLayers[0];
    var size = myLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    var sizeValue = size.value;
    var position = myLayer.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
    var positionValue = position.value;
    var string = "the size is [" + sizeValue.toString() + "] and its position is [" + positionValue.toString() + "]";
    alert(string);
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

function getSize(rectangle){
    
    //var rectangle = comp.selectedLayers[0];
    var size = rectangle.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    var sizeValue = size.value;
    return sizeValue;
    
    }

function getPosition(rectangle){
    
    //var rectangle = comp.selectedLayers[0];
    var position = rectangle.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
    var positionValue = position.value;
    return positionValue;
    
    }

function setPosition(rectangle, positionValue){
    
    var position = rectangle.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Position");
    position.setValue(positionValue);    
    
    }

function setSize(rectangle, sizeValue){
    
    var size = rectangle.property("Contents").property("Rectangle 1").property("Contents").property("Rectangle Path 1").property("Size");
    size.setValue(sizeValue);
    
    }