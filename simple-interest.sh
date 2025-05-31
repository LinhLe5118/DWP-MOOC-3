#!/bin/bash

# Simple Interest Calculator

echo "Simple Interest Calculator"

# Get Principal
read -p "Enter Principal Amount (P): " principal

# Get Rate
read -p "Enter Annual Interest Rate (R in %): " rate

# Get Time
read -p "Enter Time Period (T in years): " time

# Calculate Simple Interest: SI = (P * R * T) / 100
simple_interest=$(echo "scale=2; ($principal * $rate * $time) / 100" | bc)

echo "-------------------------------------"
echo "Principal: $principal"
echo "Rate: $rate%"
echo "Time: $time years"
echo "Simple Interest: $simple_interest"
echo "-------------------------------------"
