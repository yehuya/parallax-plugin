# parallax plugin (JS)
## background
Parallax for background

<code>
  $('#elem').parallax().background(distance, transition);
</code>

## box
Element movment

<code>
  $('#elem').parallax().box(distance, transition);
</code>

## mobile 
Device orientation

<code>
  $('#elem').parallax().mobile().background(distance, transition);
</code>

<code>
  $('#elem').parallax().mobile().box(distance, transition);
</code>

Mobile parallax @transition param is adviced!

### @param
* @distance = Number (0-50) 
* @transition = Number (0-99999999) - ms for transition css - (OPTIONAL)
