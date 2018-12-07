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