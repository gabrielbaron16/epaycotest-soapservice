export const ClientXml = `<definitions name = "ClientService"
targetNamespace = "http://www.examples.com/wsdl/ClientService.wsdl"
xmlns = "http://schemas.xmlsoap.org/wsdl/"
xmlns:soap = "http://schemas.xmlsoap.org/wsdl/soap/"
xmlns:tns = "http://www.examples.com/wsdl/ClientService.wsdl"
xmlns:xsd = "http://www.w3.org/2001/XMLSchema">

<message name = "CreateClientRequest">
   <part name = "document" type = "xsd:string"/>
   <part name = "name" type = "xsd:string"/>
   <part name = "lastName" type = "xsd:string"/>
   <part name = "email" type = "xsd:string"/>
   <part name = "phone" type = "xsd:string"/>
   <part name = "auth_token" type = "xsd:string"/>
</message>
 
<message name = "CreateClientResponse">
   <part name = "name" type = "xsd:string"/>
   <part name = "lastName" type = "xsd:string"/>
   <part name = "email" type = "xsd:string"/>
   <part name = "phone" type = "xsd:string"/>
</message>

<message name = "RechargeWalletRequest">
   <part name = "document" type = "xsd:string"/>
   <part name = "phone" type = "xsd:string"/>
   <part name = "value" type = "xsd:number"/>
   <part name = "auth_token" type = "xsd:string"/>
</message>
 
<message name = "RechargeWalletResponse">
   <part name = "balance" type = "xsd:number"/>
</message>

<message name = "GetBalanceRequest">
   <part name = "document" type = "xsd:string"/>
   <part name = "phone" type = "xsd:string"/>
   <part name = "auth_token" type = "xsd:string"/>
</message>

<message name = "GetBalanceResponse">
   <part name = "balance" type = "xsd:number"/>
</message>

<portType name = "Client_PortType">
   <operation name = "createClient">
      <input message = "tns:CreateClientRequest"/>
      <output message = "tns:CreateClientResponse"/>
   </operation>
   <operation name = "rechargeWallet">
      <input message = "tns:RechargeWalletRequest"/>
      <output message = "tns:RechargeWalletResponse"/>
   </operation>
   <operation name = "getBalance">
      <input message = "tns:GetBalanceRequest"/>
      <output message = "tns:GetBalanceResponse"/>
   </operation>
</portType>

<binding name = "Client_Binding" type = "tns:Client_PortType">
   <soap:binding style = "rpc"
      transport = "http://schemas.xmlsoap.org/soap/http"/>
   <operation name = "createClient">
      <soap:operation soapAction = "createClient"/>
      <input>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:Clientservice"
            use = "encoded"/>
      </input>
     
      <output>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:Clientservice"
            use = "encoded"/>
      </output>
   </operation>
   <operation name = "rechargeWallet">
      <soap:operation soapAction = "rechargeWallet"/>
      <input>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:Clientservice"
            use = "encoded"/>
      </input>
     
      <output>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:Clientservice"
            use = "encoded"/>
      </output>
   </operation>
   <operation name = "getBalance">
      <soap:operation soapAction = "getBalance"/>
      <input>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:Clientservice"
            use = "encoded"/>
      </input>
     
      <output>
         <soap:body
            encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/"
            namespace = "urn:examples:Clientservice"
            use = "encoded"/>
      </output>
   </operation>
</binding>

<service name = "Client_Service">
   <documentation>WSDL File for ClientService</documentation>
   <port binding = "tns:Client_Binding" name = "Client_Port">
      <soap:address
         location = "http://www.examples.com/ClientService/" />
   </port>
</service>
</definitions>`;
