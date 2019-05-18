package org.optaplanner.examples.taskassigning.persistence;


import java.util.Arrays;

public class Tache {
    private String ID;
    private int duree;
    private String[] competencesRequises;
    private String priority;
    private boolean isFreeTime;

    public Tache(String ID, int duree, JSONArray competencesRequises, String priority){
        this.ID=ID;
        this.duree=duree;
        this.competencesRequises = new String[competencesRequises.length()];
        for (int i=0; i<competencesRequises.length(); i++){
            this.competencesRequises[i]=competencesRequises.getString(i);
        }
        this.priority=priority;
    }

    @Override
    public String toString() {
        return "Tache{" +
                "ID='" + ID + '\'' +
                ", duree=" + duree +
                ", competencesRequises=" + Arrays.toString(competencesRequises) +
                ", priority='" + priority + '\'' +
                ", isFreeTime=" + isFreeTime +
                '}';
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

    public String[] getCompetencesRequises() {
        return competencesRequises;
    }

    public void setCompetencesRequises(String[] competencesRequises) {
        this.competencesRequises = competencesRequises;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public boolean isFreeTime() {
        return isFreeTime;
    }

    public void setFreeTime(boolean freeTime) {
        isFreeTime = freeTime;
    }
}
