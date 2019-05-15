package org.optaplanner.examples.taskassigning.persistence;

import org.json.JSONArray;

import java.util.Arrays;

public class Employe {
    private String ID;
    private String[] competences;
    private String[] creneaux;

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
}
