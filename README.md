# BucksBalance

See your starbucks card balance from the command line.

```bash
# From this repo's root
sudo pip install -e .

# Set up your .bucksbalance config
cat << EOF > ~/.bucksbalance
{
    "cards": {
        "yourcard": (1234123412341234, 12341234)
    }
}
EOF

bucksbalance
```
