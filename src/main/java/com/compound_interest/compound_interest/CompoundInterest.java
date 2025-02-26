package com.compound_interest.compound_interest;

public class CompoundInterest {
    private double principal;
    private double rate;
    private int time;
    private double recurringContribution;
    private double futureValue;

    public CompoundInterest(double principal, double rate, int time, double recurringContribution) {
        this.principal = principal;
        this.rate = rate;
        this.time = time;
        this.recurringContribution = recurringContribution;
        this.futureValue = calculateFutureValue();
    }

    private double calculateFutureValue() {
        double monthlyRate = rate / 100 / 12;
        int totalMonths = time * 12;
        double compoundPrincipal = principal * Math.pow(1 + monthlyRate, totalMonths);
        double compoundContributions = recurringContribution * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
        return compoundPrincipal + compoundContributions;
    }

    public double getPrincipal() {
        return principal;
    }

    public void setPrincipal(double principal) {
        this.principal = principal;
        this.futureValue = calculateFutureValue(); // Recalculate future value
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
        this.futureValue = calculateFutureValue(); // Recalculate future value
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
        this.futureValue = calculateFutureValue(); // Recalculate future value
    }

    public double getRecurringContribution() {
        return recurringContribution;
    }

    public void setRecurringContribution(double recurringContribution) {
        this.recurringContribution = recurringContribution;
        this.futureValue = calculateFutureValue(); // Recalculate future value
    }

    public double getFutureValue() {
        return futureValue;
    }
}
