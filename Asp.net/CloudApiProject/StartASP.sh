#!/bin/bash

dotnet restore /project/Asp.net/CloudApiProject/CloudApiProject/CloudApiProject.csproj
dotnet build /project/Asp.net/CloudApiProject/CloudApiProject/CloudApiProject.csproj
dotnet run --project /project/Asp.net/CloudApiProject/CloudApiProject/CloudApiProject.csproj