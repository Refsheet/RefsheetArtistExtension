if(typeof($)=='undefined')
	$={};

$._ext = {
    //Evaluate a file and catch the exception.
    evalFile : function(path) {
        try {
            $.evalFile(path);
        } catch (e) {alert("Exception:" + e);}
    },
    // Evaluate all the files in the given folder 
    evalFiles: function(jsxFolderPath) {
        var folder = new Folder(jsxFolderPath);
        if (folder.exists) {
            var jsxFiles = folder.getFiles("*.jsx");
            for (var i = 0; i < jsxFiles.length; i++) {
                var jsxFile = jsxFiles[i];
                $._ext.evalFile(jsxFile);
            }
        }
    }
};

function f(func) {
    try {
        return func()
    } catch(e) {
        return "ERROR: " + e;
    }
}

function getDocName() {
    return f(function() {
        return app.documents.length ? app.activeDocument.name : "No docs open!";
    })
}

function setForegroundColor(color_hex) {
    return f(function() {
        var color = new SolidColor();
        color.rgb.hexValue = color_hex;
        app.foregroundColor = color;
    })
}

function setBackgroundColor(color_hex) {
    return f(function() {
        var color = new SolidColor();
        color.rgb.hexValue = color_hex;
        app.backgroundColor = color;
    })
}

function openFile(file) {
    return f(function() {
        var fh = new File(file);
        app.open(fh);
    })
}

function placeFile(file, layerName) {
    return f(function() {
        var fh = new File(file);
        if (app.activeDocument) {
            var sourceDoc = app.activeDocument;
            var newDoc = open(fh);
            if (!layerName) layerName = newDoc.name;

            try {
                // Convert to layer
                newDoc.artLayers.add();
                newDoc.mergeVisibleLayers();
                var layer = newDoc.activeLayer;
                layer.name = layerName;

                // Place Image
                layer.duplicate(sourceDoc, ElementPlacement.PLACEATBEGINNING);
            } catch(e) {
                throw(e);
            } finally {
                newDoc.close(SaveOptions.DONOTSAVECHANGES);
            }
        } else {
            app.open(fh);
        }
    })
}