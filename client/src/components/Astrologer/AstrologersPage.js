import React from 'react'
import styled from 'styled-components';

function AstrologersPage() {
  return (
    <outerDiv>
   		<Left>
   			<img src="./Images\images.png" class="Pic" />
   		</Left>
   		<Right>
   			<h2 style="margin-left:20px" class="h2"> Astrologer Name</h2>
   			<img src="./Images/verified.webp" style="margin-left: 6px;" /><br></br>
   			<img src="./Images/chatoffline.png" />
   			<p style="display: inline; margin-left: 5px;">0 mins</p>
   			<img src="./Images/calloffline.png" style="margin-left: 30px;" />
   			<p style="display: inline; margin-left: 5px;">0 mins</p>
   			<img src="./Images/reports.webp" style="margin-left: 30px;" />
   			<p style="display: inline; margin-left: 5px;">0 mins</p>
   			<p>Language</p>
   			<p><b>Experience</b> years</p>
   			<p style="display: inline; border: 2px solid #ccc; border-radius: 9px; padding: 4px;">Tarot</p><br></br>
   			<button>
   				<img src="./Images/online-status-chat.png" />
   				<p style="display: inline; margin-left:35px">Start Chat</p>
   				<p style="display:inline; margin-left:35px">$ 40 per min</p>
   			</button>
   			<button style="margin-left:20px">
   				<img src="./Images/online-status-call.png" />
   				<p style="display: inline; margin-left:35px">Start Chat</p>
   				<p style="display:inline; margin-left:35px">$ 40 per min</p>
   			</button>
   		</Right>
        <Clear></Clear>
        <div>
   			<h2 style="text-align: center;">About me</h2>
   			<p>ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
   			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
   			quis nostrud gsfrdt exercitation ullamco laboris nisi ut aliquip ex ea commodo
   			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
   			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
   			proident, sunt in culpa qui officia deserunt mollit anim id est laborum bvhdsjvdkj msdgfhjsbfmes hgfkhbfmsab mdfsbfmjsg hgskjfjkseghkj kjfkjbsejhfjsa, klshflshfh bjkhwekedf uiyduqwheuyd uydkawhj gusahd ugd augda ausgdiuas dauid audua dayd aw.</p>
   		</div>
   	</outerDiv>
  )
}

const outerDiv = styled.div`
    width: 80%;
    border: 2px solid #ccc;
    border-radius: 5px;
    margin: 20px 130px 20px 130px;
    padding-top: 20px;
`;                          

const Left = styled.div`
    float: left;
	display: inline-block;
	width: 275px;
	height: 215px;
    margin-left: 20px;
    `; 
  
const Pic = styled.div`
	width:200px;
	height: 200px;
    border-radius: 100px;
    border: 3px solid red;
     `;
                          

const Right = styled.div`
	float: left;
`;

const Clear = styled.div`
	clear: both;
`;

.h2{
	display: inline;
}
const Button = styled.div`
	padding: 15px;
	border-radius: 15px;
	background-color: white;
	color: lightgreen;
	font-size: 20px;
	border: 2px solid lightgreen;
`;                                 

export default AstrologersPage