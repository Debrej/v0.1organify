package org.optaplanner.examples.taskassigning.persistence;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;

public class JSONGenerator {
    private Employe[] employeeList;
    private HashMap<Integer, Tache> taskTypeList = new HashMap<Integer, Tache>();

    public JSONGenerator(){
        try {
            File fXmlFile = new File("data/taskassigning/solved/organify.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(fXmlFile);
            doc.getDocumentElement().normalize();
            //prettyPrint(doc);
            Node nNode = doc.getElementsByTagName("taskTypeList").item(0);
            for (int i=0;i<((Element)nNode).getElementsByTagName("TaTaskType").getLength();i++) {
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) ((Element) nNode).getElementsByTagName("TaTaskType").item(i);
                    String attributeID=  eElement.getAttribute("id");
                    String title = eElement.getElementsByTagName("title").item(0).getTextContent();
                    String id =  eElement.getElementsByTagName("id").item(0).getTextContent();
                    int baseDuration = Integer.valueOf(eElement.getElementsByTagName("baseDuration").item(0).getTextContent());
                    taskTypeList.put(Integer.valueOf(eElement.getAttribute("id")),new Tache(title,baseDuration,new JSONArray(),""));
                }
            }
            nNode = doc.getElementsByTagName("employeeList").item(0);
            employeeList= new Employe[((Element) nNode).getElementsByTagName("TaEmployee").getLength()];
            for (int i=0;i<((Element) nNode).getElementsByTagName("TaEmployee").getLength();i++) {
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) ((Element) nNode).getElementsByTagName("TaEmployee").item(i);
                    String attributeID=  eElement.getAttribute("id");
                    String id =  eElement.getElementsByTagName("id").item(0).getTextContent();
                    employeeList[i] = new Employe(id,new JSONArray(), new JSONArray());
                    for(int j=0;j<eElement.getElementsByTagName("nextTask").getLength(); j++){
                        String nextTaskAttributeID = ((Element) eElement.getElementsByTagName("nextTask").item(j)).getAttribute("id");
                        String isPinned= ((Element) eElement.getElementsByTagName("nextTask").item(j)).getElementsByTagName("pinned").item(eElement.getElementsByTagName("nextTask").getLength()-1-j).getTextContent();
                        String reference= ((Element) ((Element) eElement.getElementsByTagName("nextTask").item(j)).getElementsByTagName("taskType").item(eElement.getElementsByTagName("nextTask").getLength()-1-j)).getAttribute("reference");
                        employeeList[i].getListeTaches().add(taskTypeList.get(Integer.valueOf(reference)));
                        employeeList[i].getListeTaches().get(employeeList[i].getListeTaches().size()-1).setFreeTime(Boolean.parseBoolean(isPinned));
                    }
                }
            }
            JSONObject outputJSON = new JSONObject();
            for(int i=0; i<employeeList.length;i++){
                outputJSON.put(employeeList[i].getID(), new JSONArray());
                for(int j=0;j< employeeList[i].getListeTaches().size();j++){
                    if(!employeeList[i].getListeTaches().get(j).isFreeTime()){
                        outputJSON.getJSONArray(employeeList[i].getID()).put(new JSONObject()
                                .put("taskID", employeeList[i].getListeTaches().get(j).getID())
                                .put("duree",employeeList[i].getListeTaches().get(j).getDuree())
                        );
                    }
                }
            }
            writeInFile(outputJSON.toString(4));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String prettyPrint(Document xml) throws Exception {
        Transformer tf = TransformerFactory.newInstance().newTransformer();
        tf.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
        tf.setOutputProperty(OutputKeys.INDENT, "no");
        Writer out = new StringWriter();
        tf.transform(new DOMSource(xml), new StreamResult(out));
        System.out.println(out.toString());
        return (out.toString());
    }

    public static void writeInFile(String json) throws IOException {
        BufferedWriter writer = new BufferedWriter(new FileWriter("data/taskassigning/solved/organify.json"));
        writer.write(json);
        writer.close();
    }
}
