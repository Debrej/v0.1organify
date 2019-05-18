package org.optaplanner.examples.taskassigning.persistence;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class XmlGenerator {
    private String[] skillList;
    private Employe[] employeeList;
    private Tache[] taskTypeList;
    private HashMap<String, Integer> competenceID = new HashMap<String, Integer>();
    private HashMap<String, Integer> tacheID = new HashMap<String, Integer>();
    private LinkedList<String> nextTaskIDs = new LinkedList<String>();

    public XmlGenerator() {
        String inputJSON = readAllBytesJava7("data/taskassigning/unsolved/organify.json");
        init(new JSONObject(inputJSON));
        build_XML();
    }

    private void build_XML(){
        JSONObject competences = new JSONObject();
        int idTemp=0;
        competences.put("TaSkill", new JSONArray());
        for(int i=0; i<skillList.length; i++){
            competences.getJSONArray("TaSkill")
            .put(new JSONObject()
                .put("name", skillList[i])
                .put("id", idTemp++)
            );
        }

        JSONObject typesTache = new JSONObject();
        typesTache.put("TaTaskType", new JSONArray());
        idTemp=0;
        for(int i =0; i< taskTypeList.length; i++){
            typesTache.getJSONArray("TaTaskType")
                    .put(new JSONObject()
                            .put("id", idTemp++)
                            .put("baseDuration", taskTypeList[i].getDuree())
                            .put("code","NONE")
                            .put("title", taskTypeList[i].getID())
                            .put("requiredSkillList", new JSONObject()
                                    .put("TaSkill", new JSONArray())
                            )
                    );
            for(int j =0; j<taskTypeList[i].getCompetencesRequises().length;j++){
                typesTache.getJSONArray("TaTaskType").getJSONObject(i).getJSONObject("requiredSkillList").getJSONArray("TaSkill").put(new JSONObject());
            }
        }

        JSONObject employes = new JSONObject();
        employes.put("TaEmployee", new JSONArray());
        for(int i=0; i<employeeList.length; i++){
            employes.getJSONArray("TaEmployee")
                    .put(new JSONObject()
                            .put("fullName", String.valueOf(employeeList[i].getID()))
                            .put("id", String.valueOf(employeeList[i].getID()))
                            .put("skillSet", new JSONObject()
                                    .put("TaSkill",new JSONArray())
                            )
                            .put("affinityMap",new JSONObject())
                            //.put("nextTask", new JSONObject())
                            /*.put("nextTask",new JSONObject()
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
                            )*/
                    );
            JSONObject nextTask;
            nextTask = employes.getJSONArray("TaEmployee").getJSONObject(i);
            if(nextTask.has("nextTask")){
                nextTask=nextTask.getJSONObject("nextTask");
            }
            for(int j = 0;j<employeeList[i].getCreneaux().length;j++){
                nextTask.put("nextTask", new JSONObject()
                        .put("id", idTemp++)
                        .put("taskType", new JSONObject())
                        .put("indexInTaskType", taskTypeList.length-1)
                        .put("customer", new JSONObject())
                        .put("readyTime", 0)
                        .put("priority", "MAJOR")
                        .put("pinned", true)
                        .put("previousTaskOrEmployee", new JSONObject())
                        .put("employee", new JSONObject())
                        .put("startTime", Integer.valueOf(employeeList[i].getCreneaux()[j])*120)
                );
                nextTask = nextTask.getJSONObject("nextTask");
            }
            for(int j=0;j<employeeList[i].getCompetences().length;j++){
                employes.getJSONArray("TaEmployee").getJSONObject(i).getJSONObject("skillSet").getJSONArray("TaSkill").put(new JSONObject());
            }
        }
        JSONObject taches = new JSONObject();
        taches.put("TaTask", new JSONArray());
        idTemp = 0;
        for (int i=0; i< taskTypeList.length-1;i++){
            taches.getJSONArray("TaTask")
                    .put(new JSONObject()
                            .put("id", idTemp++)
                            .put("taskType", new JSONObject())
                            .put("indexInTaskType",i)
                            .put("customer",new JSONObject())
                            .put("readyTime",0)
                            .put("priority", taskTypeList[i].getPriority())
                            .put("pinned",false)
                    );
            /*if(taches.getJSONArray("TaTask").getJSONObject(i).getInt("indexInTaskType")==taskTypeList.length-1){
                taches.getJSONArray("TaTask").getJSONObject(i).put("pinned", false); //probleme
            }*/
        }
        for(int i=0;i<employeeList.length; i++){
            for(int j=0; j< employeeList[i].getCreneaux().length;j++){
                taches.getJSONArray("TaTask").put(new JSONObject());
            }
        }

        JSONObject myJSON = new JSONObject()
                .put("TaTaskAssigningSolution",new JSONObject()
                        .put("id",0)
                        .put("skillList", competences)
                        .put("taskTypeList", typesTache)
                        .put("customerList",new JSONObject())
                        .put("employeeList", employes)
                        .put("taskList", taches)
                        //.put("score", "[0]hard/[0/-14400/0/-180]soft")
                        .put("frozenCutoff", 0)
                );
        System.out.println(myJSON.toString(4));

        //CONVERT JSON TO XML
        String xml = XML.toString(myJSON);
        //System.out.println(xml);

        //ADD IDs FROM XML
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        dbf.setValidating(false);
        DocumentBuilder db = null;
        try {
            db = dbf.newDocumentBuilder();
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        }
        Document doc = null;
        doc = convertStringToXMLDocument( xml );

        int id=1;
        Element element = (Element) doc.getElementsByTagName("TaTaskAssigningSolution").item(0);
        Object temp;
        element.setAttribute("id", String.valueOf(id++));
        temp = myJSON.getJSONObject("TaTaskAssigningSolution").getJSONObject("skillList").getJSONArray("TaSkill");
        ((Element) element.getElementsByTagName("skillList").item(0)).setAttribute("id", String.valueOf(id++));
        for(int i=0; i<((temp instanceof JSONObject)?1:((JSONArray)temp).length());i++){
            int index = id++;
            ((Element)((Element)element.getElementsByTagName("skillList").item(0)).getElementsByTagName("TaSkill").item(i)).setAttribute("id", String.valueOf(index));
            competenceID.put(((Element)((Element)element.getElementsByTagName("skillList").item(0)).getElementsByTagName("TaSkill").item(i)).getElementsByTagName("name").item(0).getChildNodes().item(0).getNodeValue(),index);
        }
        ((Element) element.getElementsByTagName("taskTypeList").item(0)).setAttribute("id", String.valueOf(id++));
        temp = myJSON.getJSONObject("TaTaskAssigningSolution").getJSONObject("taskTypeList").get("TaTaskType");
        for(int i=0; i<((temp instanceof JSONObject)?1:((JSONArray)temp).length());i++){
            int index = id;
            tacheID.put(((Element)((Element)element.getElementsByTagName("taskTypeList").item(0)).getElementsByTagName("TaTaskType").item(i)).getElementsByTagName("title").item(0).getChildNodes().item(0).getNodeValue(),index);
            ((Element)((Element)element.getElementsByTagName("taskTypeList").item(0)).getElementsByTagName("TaTaskType").item(i)).setAttribute("id", String.valueOf(id++));
            ((Element)((Element)((Element)element.getElementsByTagName("taskTypeList").item(0)).getElementsByTagName("TaTaskType").item(i)).getElementsByTagName("requiredSkillList").item(0)).setAttribute("id", String.valueOf(id++));
            for(int j=0;j<taskTypeList[getIndexOfTask (((JSONArray)temp).getJSONObject(i).getString("title"))].getCompetencesRequises().length;j++){
                if(competenceID.get(taskTypeList[i].getCompetencesRequises()[j])!=null)
                    ((Element)((Element)((Element)((Element)element.getElementsByTagName("taskTypeList").item(0)).getElementsByTagName("TaTaskType").item(i)).getElementsByTagName("requiredSkillList").item(0)).getElementsByTagName("TaSkill").item(j)).setAttribute("reference", String.valueOf(competenceID.get(taskTypeList[i].getCompetencesRequises()[j])));
            }
        }
        ((Element) element.getElementsByTagName("customerList").item(0)).setAttribute("id", String.valueOf(id++));
        /*temp=myJSON.getJSONObject("TaTaskAssigningSolution").getJSONObject("customerList").get("TaCustomer");
        for(int i=0; i<((temp instanceof JSONObject)?1:((JSONArray)temp).length());i++){
            ((Element)((Element)element.getElementsByTagName("customerList").item(0)).getElementsByTagName("TaCustomer").item(i)).setAttribute("id", String.valueOf(id++));
        }*/
        ((Element) element.getElementsByTagName("employeeList").item(0)).setAttribute("id", String.valueOf(id++));
        temp = myJSON.getJSONObject("TaTaskAssigningSolution").getJSONObject("employeeList").get("TaEmployee");
        for(int i=0; i<((temp instanceof JSONObject)?1:((JSONArray)temp).length());i++){
            Element tempElem = ((Element)((Element)element.getElementsByTagName("employeeList").item(0)).getElementsByTagName("TaEmployee").item(i));
            int referenceEmployee =id++;
            tempElem.setAttribute("id", String.valueOf(referenceEmployee));
            for(int j=0; j<tempElem.getElementsByTagName("nextTask").getLength();j++) {
                nextTaskIDs.push(String.valueOf(id));
                ((Element)tempElem.getElementsByTagName("nextTask").item(j)).setAttribute("id", String.valueOf(id++));
                ((Element)((Element)tempElem.getElementsByTagName("nextTask").item(j)).getElementsByTagName("taskType").item(0)).setAttribute("reference", String.valueOf(tacheID.get("freeTime")));
                ((Element)((Element)tempElem.getElementsByTagName("nextTask").item(j)).getElementsByTagName("previousTaskOrEmployee").item(0)).setAttribute("class", j==0?"TaEmployee":"TaTask");
                ((Element)((Element)tempElem.getElementsByTagName("nextTask").item(j)).getElementsByTagName("previousTaskOrEmployee").item(0)).setAttribute("reference", String.valueOf(referenceEmployee+j));
                ((Element)((Element)tempElem.getElementsByTagName("nextTask").item(j)).getElementsByTagName("employee").item(0)).setAttribute("reference", String.valueOf(referenceEmployee));
            }
            for(int j=0; j<((Element)tempElem.getElementsByTagName("skillSet").item(0)).getElementsByTagName("TaSkill").getLength();j++){
                String tempEmployeeNumber = tempElem.getElementsByTagName("id").item(0).getChildNodes().item(0).getNodeValue();
                ((Element)((Element)tempElem.getElementsByTagName("skillSet").item(0)).getElementsByTagName("TaSkill").item(j)).setAttribute("reference", String.valueOf(competenceID.get(employeeList[getIndexOfEmployee(tempEmployeeNumber)].getCompetences()[j])));
            }
            ((Element)tempElem.getElementsByTagName("skillSet").item(0)).setAttribute("id", String.valueOf(id++));
            ((Element)tempElem.getElementsByTagName("skillSet").item(0)).setAttribute("class", "linked-hash-set");
            ((Element)tempElem.getElementsByTagName("affinityMap").item(0)).setAttribute("id", String.valueOf(id++));
            ((Element)tempElem.getElementsByTagName("affinityMap").item(0)).setAttribute("class", "linked-hash-map");
        }
        ((Element) element.getElementsByTagName("taskList").item(0)).setAttribute("id", String.valueOf(id++));
        temp = myJSON.getJSONObject("TaTaskAssigningSolution").getJSONObject("taskList").get("TaTask");
        for(int i=0; i<((temp instanceof JSONObject)?1:((JSONArray)temp).length());i++){
            Element nl = (Element)((Element)((Element)element.getElementsByTagName("taskList").item(0)).getElementsByTagName("TaTask").item(i));
            if(nl.getElementsByTagName("indexInTaskType").getLength()>0){
                String index = ((Element)((Element)element.getElementsByTagName("taskList").item(0)).getElementsByTagName("TaTask").item(i)).getElementsByTagName("indexInTaskType").item(0).getChildNodes().item(0).getNodeValue();
                ((Element)((Element)element.getElementsByTagName("taskList").item(0)).getElementsByTagName("TaTask").item(i)).setAttribute("id", String.valueOf(id++));
                ((Element)((Element)((Element)element.getElementsByTagName("taskList").item(0)).getElementsByTagName("TaTask").item(i)).getElementsByTagName("taskType").item(0)).setAttribute("reference",  String.valueOf(tacheID.get(taskTypeList[Integer.valueOf(index)].getID())));
            }else{
                ((Element)((Element)element.getElementsByTagName("taskList").item(0)).getElementsByTagName("TaTask").item(i)).setAttribute("reference", nextTaskIDs.pop());
            }
        }
        //((Element) element.getElementsByTagName("score").item(0)).setAttribute("id", String.valueOf(id++));

        try {
            //prettyPrint(doc);
            writeInFile(prettyPrint(doc));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void writeInFile(String xml) throws IOException {
        BufferedWriter writer = new BufferedWriter(new FileWriter("data/taskassigning/unsolved/organify.xml"));
        writer.write(xml);
        writer.close();
    }

    private void init(JSONObject inputJSON){
        int arraySize= inputJSON.getJSONArray("listeCompetences").length();
        skillList = new String[arraySize];
        for(int i =0; i<arraySize;i++){
            skillList[i]=inputJSON.getJSONArray("listeCompetences").getString(i);
        }
        arraySize = inputJSON.getJSONArray("listeEmployes").length();
        employeeList = new Employe[arraySize];
        for (int i=0;i<arraySize;i++){
            JSONObject temp = inputJSON.getJSONArray("listeEmployes").getJSONObject(i);
            employeeList[i]= new Employe( temp.getString("ID"),temp.getJSONArray("competences"), temp.getJSONArray("creneaux"));
        }
        arraySize = inputJSON.getJSONArray("listeDeTaches").length();
        taskTypeList = new Tache[arraySize+1];
        for(int i =0; i< arraySize;i++){
            JSONObject temp = inputJSON.getJSONArray("listeDeTaches").getJSONObject(i);
            taskTypeList[i]=new Tache(temp.getString("ID"), temp.getInt("duree"), temp.getJSONArray("competencesRequises"), temp.getString("priority"));
        }
        taskTypeList[arraySize]= new Tache("freeTime", 120, new JSONArray(), "MAJOR");
    }

    private int getIndexOfTask(String title){
        int res=-1;
        for(int i=0;i<taskTypeList.length; i++){
            if(taskTypeList[i].getID().equals(title)) res = i;
        }
        return res;
    }

    private int getIndexOfEmployee(String ID){
        int res=-1;
        for(int i=0; i<employeeList.length; i++){
            if(employeeList[i].getID().equals(ID)) res =i;
        }
        return res;
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

    public static String prettyPrint(Document xml) throws Exception {
        Transformer tf = TransformerFactory.newInstance().newTransformer();
        tf.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
        tf.setOutputProperty(OutputKeys.INDENT, "no");
        Writer out = new StringWriter();
        tf.transform(new DOMSource(xml), new StreamResult(out));
        System.out.println(out.toString());
        return (out.toString());
    }

    private static Document convertStringToXMLDocument(String xmlString)
    {
        //Parser that produces DOM object trees from XML content
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

        //API to obtain DOM Document instance
        DocumentBuilder builder = null;
        try
        {
            //Create DocumentBuilder with default configuration
            builder = factory.newDocumentBuilder();

            //Parse the content to Document object
            Document doc = builder.parse(new InputSource(new StringReader(xmlString)));
            return doc;
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return null;
    }

    public static String JSONGenerator()
    {
        String inputJSON = new JSONObject()
                .put("listeCompetences", new JSONArray()
                        .put("competence1")
                )
                .put("listeEmployes", new JSONArray()
                        .put(new JSONObject()
                                .put("ID","1")
                                .put("competences", new JSONArray()
                                        .put("competence1")
                                )
                                .put("creneaux", new JSONArray()
                                        .put("0")
                                        .put("2")
                                )
                        )
                        .put(new JSONObject()
                                .put("ID","2")
                                .put("competences", new JSONArray()
                                        .put("competence1")
                                )
                                .put("creneaux", new JSONArray()
                                        .put("5")
                                        .put("0")
                                )
                        )
                )
                .put("listeDeTaches", new JSONArray()
                        .put(new JSONObject()
                                .put("ID", "1")
                                .put("duree", "120")
                                .put("competencesRequises", new JSONArray()
                                        .put("competence1")
                                )
                                .put("priority","MINOR")
                        )
                        .put(new JSONObject()
                                .put("ID", "2")
                                .put("duree", "400")
                                .put("competencesRequises", new JSONArray()
                                        .put("competence1")
                                )
                                .put("priority","MINOR")
                        )
                        .put(new JSONObject()
                                .put("ID", "3")
                                .put("duree", "200")
                                .put("competencesRequises", new JSONArray()
                                        .put("competence1")
                                )
                                .put("priority","MINOR")
                        )
                )
                .toString(4);
        return inputJSON;
    }
}