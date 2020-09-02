import React from 'react'
import confirm from "../../assets/img/confirm.png";
import {Col,
Button,
Modal,
ModalHeader,
ModalBody,
} from "reactstrap";

export const PdfView = () => {
	return (
		<div>
			<Modal backdrop={false}>
            <ModalHeader></ModalHeader>
            <ModalBody className="d-flex justify-content-center align=items-center">
              <div>
                <img src={confirm} className="d-block mx-auto" />
                <h1 className="text-center">Quote has been created</h1>
                <p className="text-center">
                  You can download by clicking the download button below
                </p>
                <div className="d-flex flex-wrap">
                  <Col>
                    <Button className="blue-btn">
                      {/* <img src={downloadWhite} /> */}
                      Download
                    </Button>
                  </Col>
                  <Col>
                    <Button className="copy-btn">
                      {/* <img src={copy} /> */}
                      Copy reference
                    </Button>
                  </Col>
                </div>
              </div>
            </ModalBody>
          </Modal>
	    	<div id="pdfDiv" style={{backgroundColor:"white", color: "Black"}}>
		    <div className="super-container">

		      <div className="container">

		        <header className="header" style={{backgroundColor:"#8080801c"}}>
		          <div className="img-container">
		            <img src="Jersey_Logos-07.png" alt="" className="compLogo" />
		          </div>

		          <div className="head-right-section">
		            <h4 className="headcompName">QATAR INSULATION COMPANY</h4>
		            <h5 style={{fontWeight: "600", fontSize: "small"}}>P.O Box 7949, DOHA, QATAR</h5>
		            <h5 style={{fontWeight: "600", fontSize: "small", lineHeight: ".5"}}>PH:+974 44995077 FAX:+974 44995088</h5>
		          </div>
		        </header>
		    

		        <section className="quotation">
		          <h4 className="Heading">QUOTATION</h4>
		          <div className="tables">
		            <div className="table1">
		               <table cellpadding="20" cellspacing="5">
		              
		                    <tbody>
		                      <tr>
		                        <td className="td1">To</td>
		                        <td>:</td>
		                        <td style={{padding:"5px", fontWeight: "400"}}>Customer Names Comer Here</td>
		                        </tr>

		                        <tr>
		                        <td className="td1">Address</td>
		                        <td>:</td>
		                        <td style={{padding:"5px", fontWeight: "400"}}>P.O.Box:22801, Doha-Qatar</td>
		                        </tr>

		                        <tr>
		                        <td className="td1">Phone No.</td>
		                        <td>:</td>
		                        <td style={{padding:"5px", fontWeight: "400"}}> 33802149</td>
		                        </tr>

		                        <tr>
		                        <td className="td1">Phone No.</td>
		                        <td>:</td>
		                        <td style={{padding:"5px", fontWeight: "400"}}> 44446361</td>
		                        </tr>
		                    </tbody>
		            
		              </table>
		            </div>

		            <div className="table2">
		             <table cellpadding="20" cellspacing="5">
		              
		                    <tbody>
		                      <tr>
		                        <td className="td1">Quotation No.</td>
		                        <td>:</td>
		                        <td style={{padding:"5px", fontWeight: "400"}}>QIC/QTN205448468</td>
		                        </tr>

		                        <tr>
		                        <td className="td1">Date</td>
		                        <td>:</td>
		                        <td style={{padding:"5px", fontWeight: "400"}}> 08-APRIL-2020</td>
		                        </tr>

		                        <tr>
		                        <td className="td1">Lead/Ref No.</td>
		                        <td>:</td>
		                        <td style={{padding:"5px", fontWeight: "400"}}>L459755692</td>
		                        </tr>

		                        
		                    </tbody>
		            
		              </table>
		            </div>
		          </div>

		          <div className="project">
		            <span className="boldproj">Project</span> : PROJECT NAME COMES HERE</div>

		          <div className="line"></div>
		          

		        </section>

		        <section className="third-section">
		          <div className="attention"><span className="attbold">Attention</span> : Lead contact name comes here</div>

		          <p className="para">Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet Lorem ipsum dolar sit amet</p>
		        </section>

		        <table className="tabPadd">

		          <tr className="table-1-headers" >
		              <td className="border tdPadd sl">Sl No.</td>
		              <td className="border tdPadd">Description</td>
		              <td className="border tdPadd">Quantity</td>
		              <td className="border tdPadd unit">Unit</td>
		              <td className="border tdPadd unitPrice">Unit Price</td>
		              <td className="border tdPadd Amount">Amount</td>
		          </tr>
		        
		          <tr> 
		              <td className="border bottomNone">100</td>
		              <td className="border bottomNone desc">ssaaaaa</td>
		              <td className="border bottomNone">ss</td>
		              <td className="border bottomNone">ss</td>
		              <td className="border bottomNone">ss</td>
		              <td className="border bottomNone">ss</td>
		          </tr>
		          
		          <tr> 
		              <td className="border bottomNone">200</td>
		              <td className="border bottomNone">ss</td>
		              <td className="border bottomNone">ss</td>
		              <td className="border bottomNone">ss</td>
		              <td className="border bottomNone">ss</td>
		              <td className="border bottomNone">ss</td>
		          </tr>
		        </table>

		        <footer className="footer">
		          <div className="left-portion">02 March 2020 .2:08 PM</div>
		          <div className="center-portion">Page 1 of 2</div>
		          <div className="right-portion">By: Ramamoorthy</div>
		        </footer>
		          
		      </div>
		  
		    </div>
	  		</div>
	  	</div>
	);
};
