package org.optaplanner.examples.taskassigning.persistence;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;

public class XmlGenerator {
    private String[] skillList;
    private String[] employeeList;
    private String[] taskTypeList;
    private String[] taskList;
    public XmlGenerator() {

        String jsonString = new JSONObject()
                .put("TaTaskAssigningSolution",new JSONObject()
                    .put("id",0)
                    .put("skillList", new JSONObject()
                        .put("TaSkill", new JSONObject()
                                .put("name","ma competence")
                                .put("id", 0)
                        )
                    )
                    .put("taskTypeList", new JSONObject()
                            .put("TaTaskType", new JSONObject()
                                    .put("id",0)
                                    .put("baseDuration",60)
                                    .put("code","MT")
                                    .put("title","ma tache")
                                    .put("requiredSkillList", new JSONObject()
                                            .put("TaSkill", new JSONObject()
                                                    .put("reference", 3)
                                            )
                                    )
                            )
                    )
                    .put("customerList",new JSONObject()
                            .put("TaCustomer", new JSONObject()
                                    .put("name", "clientname")
                                    .put("id",0)
                            )
                    )
                    .put("employeeList", new JSONObject()
                            .put("TaEmployee", new JSONObject()
                                    .put("fullName", "Amy")
                                    .put("id",0)
                                    .put("skillset", new JSONObject()
                                            .put("reference",3)
                                    )
                                    .put("affinityMap",new JSONObject()
                                            .put("entry", new JSONObject()
                                                    .put("TaCustomer", new JSONObject()
                                                            .put("reference",8)
                                                    )
                                                    .put("org.optaplanner.examples.taskassigning.domain.Affinity", "NONE")
                                            )
                                    )
                                    .put("nextTask",new JSONObject()
                                            .put("id",0)
                                            .put("taskType",new JSONObject()
                                                    .put("reference",5)
                                            )
                                            .put("readyTime", 0)
                                            .put("pinned", false)
                                            .put("indexInTaskType", 1)
                                            .put("previousTaskOrEmployee",new JSONObject()
                                                    .put("reference",10)
                                            )
                                            .put("startTime",0)
                                            .put("priority","MINOR")
                                            .put("employee", new JSONObject()
                                                    .put("reference", 10)
                                            )
                                            .put("nextTask", new JSONObject())
                                            .put("customer", new JSONObject()
                                                    .put("reference",8)
                                            )
                                    )
                            )
                    )
                    .put("taskList", new JSONObject()
                            .put("TaTask",new JSONObject[] {new JSONObject().put("reference",11), new JSONObject().put("reference",12)})
                    )
                    .put("score", "[0]hard/[0/-14400/0/-180]soft")
                    .put("frozenCutoff", 0)

                )
                .toString(4);

        /*JSONObject json = new JSONObject(jsonString);
        String xml = XML.toString(json);
        System.out.println(xml);*/
        JSONObject json = new JSONObject();
        try {
            json = XML.toJSONObject(readAllBytesJava7( "data/taskassigning/unsolved/trash.xml" ));
            String jsonPrettyPrintString = json.toString(4);
            System.out.println(jsonPrettyPrintString);
        } catch (JSONException je) {
            System.out.println(je.toString());
        }

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        dbf.setValidating(false);
        DocumentBuilder db = null;
        try {
            db = dbf.newDocumentBuilder();
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        }
        Document doc = null;
        try {
            doc = db.parse(new FileInputStream(new File("data/taskassigning/unsolved/trash.xml")));
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        int id=1;
        Element element = (Element) doc.getElementsByTagName("TaTaskAssigningSolution").item(0);
        Object temp;
        element.setAttribute("id", String.valueOf(id++));
        temp = json.getJSONObject("TaTaskAssigningSolution").getJSONObject("skillList").get("TaSkill");
        ((Element) element.getElementsByTagName("skillList").item(0)).setAttribute("id", String.valueOf(id++));
        for(int i=0; i<((temp instanceof JSONObject)?1:((JSONArray)temp).length());i++){
            ((Element)((Element)element.getElementsByTagName("skillList").item(0)).getElementsByTagName("TaSkill").item(i)).setAttribute("id", String.valueOf(id++));
        }
        ((Element) element.getElementsByTagName("taskTypeList").item(0)).setAttribute("id", String.valueOf(id++));
        temp = json.getJSONObject("TaTaskAssigningSolution").getJSONObject("taskTypeList").get("TaTaskType");
        for(int i=0; i<((temp instanceof JSONObject)?1:((JSONArray)temp).length());i++){
            ((Element)((Element)element.getElementsByTagName("taskTypeList").item(0)).getElementsByTagName("TaTaskType").item(i)).setAttribute("id", String.valueOf(id++));
            ((Element)((Element)((Element)element.getElementsByTagName("taskTypeList").item(0)).getElementsByTagName("TaTaskType").item(i)).getElementsByTagName("requiredSkillList").item(0)).setAttribute("id", String.valueOf(id++));
        }
        ((Element) element.getElementsByTagName("customerList").item(0)).setAttribute("id", String.valueOf(id++));
        temp=json.getJSONObject("TaTaskAssigningSolution").getJSONObject("customerList").get("TaCustomer");
        for(int i=0; i<((temp instanceof JSONObject)?1:((JSONArray)temp).length());i++){
            ((Element)((Element)element.getElementsByTagName("customerList").item(0)).getElementsByTagName("TaCustomer").item(i)).setAttribute("id", String.valueOf(id++));
        }
        ((Element) element.getElementsByTagName("employeeList").item(0)).setAttribute("id", String.valueOf(id++));
        temp = json.getJSONObject("TaTaskAssigningSolution").getJSONObject("employeeList").get("TaEmployee");
        for(int i=0; i<((temp instanceof JSONObject)?1:((JSONArray)temp).length());i++){
            Element tempElem = ((Element)((Element)element.getElementsByTagName("employeeList").item(0)).getElementsByTagName("TaEmployee").item(i));
            tempElem.setAttribute("id", String.valueOf(id++));
            while(tempElem.getElementsByTagName("nextTask").getLength()>0) {
                System.out.println("pdpdpdpdpdp\n\n");
            }
            ((Element)((Element)((Element)element.getElementsByTagName("employeeList").item(0)).getElementsByTagName("TaEmployee").item(i)).getElementsByTagName("nextTask").item(0)).setAttribute("id", String.valueOf(id++));
        }
        ((Element) element.getElementsByTagName("taskList").item(0)).setAttribute("id", String.valueOf(id++));
        ((Element) element.getElementsByTagName("score").item(0)).setAttribute("id", String.valueOf(id++));
        //System.out.println(json.getJSONObject("TaTaskAssigningSolution").getJSONObject("skillList").getJSONArray("TaSkill").length());
        try {
            prettyPrint(doc);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static String readAllBytesJava7(String filePath) {
        String content = "";
        try {
            content = new String ( Files.readAllBytes( Paths.get(filePath) ) );
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        return content;
    }

    public static final void prettyPrint(Document xml) throws Exception {
        Transformer tf = TransformerFactory.newInstance().newTransformer();
        tf.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
        tf.setOutputProperty(OutputKeys.INDENT, "no");
        Writer out = new StringWriter();
        tf.transform(new DOMSource(xml), new StreamResult(out));
        System.out.println(out.toString());
    }

    public static void main(String[] args) {
        new XmlGenerator();
    }
}