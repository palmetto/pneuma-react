function getSpacingCss(attribute, value) {
  if (value === undefined) {
    return {
      styles: {},
      classes: [],
    };
  }

  const classes = [];
  let styles;

  // value is css shorthand
  if (value.split && value.split(' ').length > 1) {
    const side = value.split(' ');
    // x and y, e.g. 'xs sm'
    if (side.length === 2) {
      if (side[0] !== '0') classes.push(`${attribute}-v-${side[0]}`);
      if (side[1] !== '0') classes.push(`${attribute}-h-${side[1]}`);
    } else if (side.length === 3) { // top, horizontal, bottom
      if (side[0] !== '0') classes.push(`${attribute}-top-${side[0]}`);
      if (side[1] !== '0') classes.push(`${attribute}-h-${side[1]}`);
      if (side[2] !== '0') classes.push(`${attribute}-bottom-${side[2]}`);
    } else if (side.length === 4) { // top, right, bottom left
      if (side[0] !== '0') classes.push(`${attribute}-top-${side[0]}`);
      if (side[1] !== '0') classes.push(`${attribute}-right-${side[1]}`);
      if (side[2] !== '0') classes.push(`${attribute}-bottom-${side[2]}`);
      if (side[3] !== '0') classes.push(`${attribute}-left-${side[3]}`);
    }
  } else if (typeof value === 'string') {
    if (value === 'inherit') {
      styles = 'inherit';
    } else {
      classes.push(`${attribute}-${value}`);
    }
  }

  return ({
    styles,
    classes,
  });
}

export default getSpacingCss;
