package org.optaplanner.examples.taskassigning.persistence;

import java.util.Arrays;
import java.util.ArrayList; // import the ArrayList class

public class Employe {
    private String ID;
    private String[] competences;
    private String[] creneaux;
    private ArrayList<Tache> listeTaches = new ArrayList<Tache>();

    public Employe(String ID, JSONArray competences, JSONArray creneaux){
        this.ID=ID;
        this.competences = new String[competences.length()];
        for(int i=0;i<competences.length();i++){
            this.competences[i]=competences.getString(i);
        }
        this.creneaux= new String[creneaux.length()];
        for(int i=0; i< creneaux.length();i++){
            this.creneaux[i]= creneaux.getString(i);
        }
    }

    @Override
    public String toString() {
        return "Employe{" +
                "ID='" + ID + '\'' +
                ", competences=" + Arrays.toString(competences) +
                ", creneaux=" + Arrays.toString(creneaux) +
                ", listeTaches=" + listeTaches +
                '}';
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String[] getCompetences() {
        return competences;
    }

    public void setCompetences(String[] competences) {
        this.competences = competences;
    }

    public String[] getCreneaux() {
        return creneaux;
    }

    public void setCreneaux(String[] creneaux) {
        this.creneaux = creneaux;
    }

    public ArrayList<Tache> getListeTaches() {
        return listeTaches;
    }

    public void setListeTaches(ArrayList<Tache> listeTaches) {
        this.listeTaches = listeTaches;
    }
}
