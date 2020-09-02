let numbers = /^[0-9]+$/;
    let letters = /^[a-zA-Z,. ]*$/;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phoneno = /^\d{10}$/;
    let alphanumeric = /^[0-9a-zA-Z,/ ]+$/;

    let sting = /^[a-zAZ]*$/;


var totalWords = "foo love bar very much.";

var firstWord = totalWords.replace(/ .*/,'');
var fd = fd.append(firstWord);


if(this.state.optionalValues){
  let jsonObject = this.state.optionalValues.map(JSON.stringify); 
  let uniqueSet = new Set(jsonObject); 
  let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
  // let arrayById = uniqueArray.findIndex(x => x.id === product.product);
  // let arrayById = uniqueArray.filter(x => x.id === product.product);
  let arrayById = uniqueArray.filter(x => x.id === product.product).map(x => x.option);                      
  return console.log(arrayById)
} else return null

----------------------------------------------------------------------------------------------------------------
<DropdownItem onMouseOver={() => this.setState({ dropOptions: true })} 
                                    onMouseOut={() => this.setState({ dropOptions: true })}>
                                    {this.state.dropOptions ?(
                                      <div style={{transform: "translate(-66px, -28px)"}}>
                                      <DropdownMenu right>
                                      <DropdownItem onClick={this.optionsA.bind(this, product)}>Option A</DropdownItem>
                                      <DropdownItem onClick={this.optionsB.bind(this, product)}>Option B</DropdownItem>
                                      <DropdownItem onClick={this.optionsC.bind(this, product)}>Option C</DropdownItem>
                                      </DropdownMenu>
                                    </div>
                                      ): null}
                                      <i class="fa fa-caret-down"
                                      style={{marginLeft: "-8px", transform: "translateX(-8px) rotate(90deg)"}}>
                                      </i>
                                      Add Options
                                  </DropdownItem>
--------------------------------------------------
=======
    let sting = /^[a-zAZ]*$/;
