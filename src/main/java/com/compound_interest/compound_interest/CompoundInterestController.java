package com.compound_interest.compound_interest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

    @RestController
public class CompoundInterestController {
    @GetMapping("/calculate")
    public CompoundInterest calculateFutureValue(
            @RequestParam double principal,
            @RequestParam double rate,
            @RequestParam int time,
            @RequestParam double recurringContribution) {
        // Create a new object with user inputs
        return new CompoundInterest(principal, rate, time, recurringContribution);
    }
}

