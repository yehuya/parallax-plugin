# Parallax plugin (JS)
Element movment by mouse or device orientation

## Init
### jQuery 
```javascript
$('<ONLY-ID-OF-ONE-ELEMENT>').parallax({
  distance: <INTEGER>, // for the movment distance
  transition: <INTEGER>, // ms for transition css for the movement
  orientation: <BOLLEAN>, // default is true - for device orientation support and movement
  orientationStyle { // only for device orientation
    transition: <INTEGER>, 
    distance: <INTEGER>
  }
});
```
@orientationStyle.transition param is adviced! (default = 100)
