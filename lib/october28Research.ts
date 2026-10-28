import type { ResearchPost } from './types';

export const october28ResearchBatch: readonly ResearchPost[] = [
  {
    "slug": "dispatch-response-latency-study-oct28",
    "title": "How Long Do Emergency Dispatch Responses Take?",
    "summary": "A protocol measuring the time from an emergency call to dispatch and technician arrival.",
    "cluster": "Dispatch evidence",
    "publishedAt": "2026-10-28",
    "finding": "A protocol measuring the time from an emergency call to dispatch and technician arrival.",
    "thumbnail": "/article-thumbnails/october-28/dispatch-response-latency-study-oct28.svg",
    "sections": [
      {
        "heading": "Research question and scope",
        "paragraphs": [
          "This protocol examines dispatch response latency. It reports what one defined record can show in a fixed window and does not claim an industry rate or a causal effect."
        ]
      },
      {
        "heading": "Population and unit of analysis",
        "paragraphs": [
          "The unit is one emergency call at intake. Using one unit keeps linked events from being counted as independent successes or failures."
        ]
      },
      {
        "heading": "Definitions and measures",
        "paragraphs": [
          "The measure is the time to dispatch and arrival. Publish the denominator and time window beside each count."
        ]
      },
      {
        "heading": "Evidence and data dictionary",
        "paragraphs": [
          "Collect the call, dispatch, and arrival timestamps. Keep missing, unavailable, and confirmed negative as separate states."
        ]
      },
      {
        "heading": "Sampling and collection",
        "paragraphs": [
          "The sample is emergency calls during one month. Record the observation date and exclude items already open before the window."
        ]
      },
      {
        "heading": "Analysis and reporting",
        "paragraphs": [
          "Report latency by call type and time of day. Separate customer behavior from staff behavior whenever the evidence supports it."
        ]
      },
      {
        "heading": "Limitations and sources of error",
        "paragraphs": [
          "Limits include calls reclassified after intake. State them beside the finding and avoid turning a small sample into a universal standard."
        ]
      },
      {
        "heading": "Review cadence and next action",
        "paragraphs": [
          "The next step is to review one slow call type. Re-test a later sample after the change."
        ]
      }
    ],
    "sources": [
      {
        "label": "Bureau of Labor Statistics",
        "url": "https://www.bls.gov/ooh/"
      },
      {
        "label": "U.S. Department of Energy",
        "url": "https://www.energy.gov/"
      },
      {
        "label": "EPA",
        "url": "https://www.epa.gov/"
      },
      {
        "label": "NIST",
        "url": "https://www.nist.gov/cyberframework"
      },
      {
        "label": "SBA",
        "url": "https://www.sba.gov/business-guide/manage-your-business"
      },
      {
        "label": "OSHA",
        "url": "https://www.osha.gov/"
      },
      {
        "label": "FTC",
        "url": "https://www.ftc.gov/business-guidance"
      },
      {
        "label": "GAO",
        "url": "https://www.gao.gov/"
      },
      {
        "label": "USA.gov",
        "url": "https://www.usa.gov/"
      },
      {
        "label": "CDC",
        "url": "https://www.cdc.gov/"
      }
    ]
  },
  {
    "slug": "maintenance-renewal-study-oct28",
    "title": "When Do Maintenance Plans Lapse?",
    "summary": "A renewal review that measures the time between notice and customer response for expiring plans.",
    "cluster": "Service evidence",
    "publishedAt": "2026-10-28",
    "finding": "A renewal review that measures the time between notice and customer response for expiring plans.",
    "thumbnail": "/article-thumbnails/october-28/maintenance-renewal-study-oct28.svg",
    "sections": [
      {
        "heading": "Research question and scope",
        "paragraphs": [
          "This protocol examines maintenance plan renewal. It reports what one defined record can show in a fixed window and does not claim an industry rate or a causal effect."
        ]
      },
      {
        "heading": "Population and unit of analysis",
        "paragraphs": [
          "The unit is one expiring plan at first notice. Using one unit keeps linked events from being counted as independent successes or failures."
        ]
      },
      {
        "heading": "Definitions and measures",
        "paragraphs": [
          "The measure is the response time and the lapse rate. Publish the denominator and time window beside each count."
        ]
      },
      {
        "heading": "Evidence and data dictionary",
        "paragraphs": [
          "Collect the plan, notice, and response. Keep missing, unavailable, and confirmed negative as separate states."
        ]
      },
      {
        "heading": "Sampling and collection",
        "paragraphs": [
          "The sample is plans expiring during one quarter. Record the observation date and exclude items already open before the window."
        ]
      },
      {
        "heading": "Analysis and reporting",
        "paragraphs": [
          "Report response by notice channel. Separate customer behavior from staff behavior whenever the evidence supports it."
        ]
      },
      {
        "heading": "Limitations and sources of error",
        "paragraphs": [
          "Limits include customers without current contact details. State them beside the finding and avoid turning a small sample into a universal standard."
        ]
      },
      {
        "heading": "Review cadence and next action",
        "paragraphs": [
          "The next step is to add one earlier notice for slow segments. Re-test a later sample after the change."
        ]
      }
    ],
    "sources": [
      {
        "label": "Bureau of Labor Statistics",
        "url": "https://www.bls.gov/ooh/"
      },
      {
        "label": "U.S. Department of Energy",
        "url": "https://www.energy.gov/"
      },
      {
        "label": "EPA",
        "url": "https://www.epa.gov/"
      },
      {
        "label": "NIST",
        "url": "https://www.nist.gov/cyberframework"
      },
      {
        "label": "SBA",
        "url": "https://www.sba.gov/business-guide/manage-your-business"
      },
      {
        "label": "OSHA",
        "url": "https://www.osha.gov/"
      },
      {
        "label": "FTC",
        "url": "https://www.ftc.gov/business-guidance"
      },
      {
        "label": "GAO",
        "url": "https://www.gao.gov/"
      },
      {
        "label": "USA.gov",
        "url": "https://www.usa.gov/"
      },
      {
        "label": "CDC",
        "url": "https://www.cdc.gov/"
      }
    ]
  },
  {
    "slug": "parts-order-delay-study-oct28",
    "title": "Where Do Parts Orders Lose Time?",
    "summary": "A protocol separating vendor delay, approval delay, and customer-caused delay in parts orders.",
    "cluster": "Service evidence",
    "publishedAt": "2026-10-28",
    "finding": "A protocol separating vendor delay, approval delay, and customer-caused delay in parts orders.",
    "thumbnail": "/article-thumbnails/october-28/parts-order-delay-study-oct28.svg",
    "sections": [
      {
        "heading": "Research question and scope",
        "paragraphs": [
          "This protocol examines parts order delays. It reports what one defined record can show in a fixed window and does not claim an industry rate or a causal effect."
        ]
      },
      {
        "heading": "Population and unit of analysis",
        "paragraphs": [
          "The unit is one ordered part with a promised date. Using one unit keeps linked events from being counted as independent successes or failures."
        ]
      },
      {
        "heading": "Definitions and measures",
        "paragraphs": [
          "The measure is the delay by stage. Publish the denominator and time window beside each count."
        ]
      },
      {
        "heading": "Evidence and data dictionary",
        "paragraphs": [
          "Collect the order, vendor, approval, and arrival. Keep missing, unavailable, and confirmed negative as separate states."
        ]
      },
      {
        "heading": "Sampling and collection",
        "paragraphs": [
          "The sample is orders placed during one quarter. Record the observation date and exclude items already open before the window."
        ]
      },
      {
        "heading": "Analysis and reporting",
        "paragraphs": [
          "Report delay by vendor and part type. Separate customer behavior from staff behavior whenever the evidence supports it."
        ]
      },
      {
        "heading": "Limitations and sources of error",
        "paragraphs": [
          "Limits include backorders and canceled orders. State them beside the finding and avoid turning a small sample into a universal standard."
        ]
      },
      {
        "heading": "Review cadence and next action",
        "paragraphs": [
          "The next step is to set an earlier reminder for slow vendors. Re-test a later sample after the change."
        ]
      }
    ],
    "sources": [
      {
        "label": "Bureau of Labor Statistics",
        "url": "https://www.bls.gov/ooh/"
      },
      {
        "label": "U.S. Department of Energy",
        "url": "https://www.energy.gov/"
      },
      {
        "label": "EPA",
        "url": "https://www.epa.gov/"
      },
      {
        "label": "NIST",
        "url": "https://www.nist.gov/cyberframework"
      },
      {
        "label": "SBA",
        "url": "https://www.sba.gov/business-guide/manage-your-business"
      },
      {
        "label": "OSHA",
        "url": "https://www.osha.gov/"
      },
      {
        "label": "FTC",
        "url": "https://www.ftc.gov/business-guidance"
      },
      {
        "label": "GAO",
        "url": "https://www.gao.gov/"
      },
      {
        "label": "USA.gov",
        "url": "https://www.usa.gov/"
      },
      {
        "label": "CDC",
        "url": "https://www.cdc.gov/"
      }
    ]
  },
  {
    "slug": "warranty-claim-completeness-study-oct28",
    "title": "Which Warranty Claims Return Incomplete?",
    "summary": "A review of warranty submissions and the fields or attachments missing most often.",
    "cluster": "Service evidence",
    "publishedAt": "2026-10-28",
    "finding": "A review of warranty submissions and the fields or attachments missing most often.",
    "thumbnail": "/article-thumbnails/october-28/warranty-claim-completeness-study-oct28.svg",
    "sections": [
      {
        "heading": "Research question and scope",
        "paragraphs": [
          "This protocol examines warranty claim completeness. It reports what one defined record can show in a fixed window and does not claim an industry rate or a causal effect."
        ]
      },
      {
        "heading": "Population and unit of analysis",
        "paragraphs": [
          "The unit is one warranty claim at submission. Using one unit keeps linked events from being counted as independent successes or failures."
        ]
      },
      {
        "heading": "Definitions and measures",
        "paragraphs": [
          "The measure is the share returned incomplete and the missing field. Publish the denominator and time window beside each count."
        ]
      },
      {
        "heading": "Evidence and data dictionary",
        "paragraphs": [
          "Collect the claim, equipment, and attachment list. Keep missing, unavailable, and confirmed negative as separate states."
        ]
      },
      {
        "heading": "Sampling and collection",
        "paragraphs": [
          "The sample is claims submitted during one quarter. Record the observation date and exclude items already open before the window."
        ]
      },
      {
        "heading": "Analysis and reporting",
        "paragraphs": [
          "Report return reasons by manufacturer. Separate customer behavior from staff behavior whenever the evidence supports it."
        ]
      },
      {
        "heading": "Limitations and sources of error",
        "paragraphs": [
          "Limits include claims later approved after correction. State them beside the finding and avoid turning a small sample into a universal standard."
        ]
      },
      {
        "heading": "Review cadence and next action",
        "paragraphs": [
          "The next step is to add one required field to the template. Re-test a later sample after the change."
        ]
      }
    ],
    "sources": [
      {
        "label": "Bureau of Labor Statistics",
        "url": "https://www.bls.gov/ooh/"
      },
      {
        "label": "U.S. Department of Energy",
        "url": "https://www.energy.gov/"
      },
      {
        "label": "EPA",
        "url": "https://www.epa.gov/"
      },
      {
        "label": "NIST",
        "url": "https://www.nist.gov/cyberframework"
      },
      {
        "label": "SBA",
        "url": "https://www.sba.gov/business-guide/manage-your-business"
      },
      {
        "label": "OSHA",
        "url": "https://www.osha.gov/"
      },
      {
        "label": "FTC",
        "url": "https://www.ftc.gov/business-guidance"
      },
      {
        "label": "GAO",
        "url": "https://www.gao.gov/"
      },
      {
        "label": "USA.gov",
        "url": "https://www.usa.gov/"
      },
      {
        "label": "CDC",
        "url": "https://www.cdc.gov/"
      }
    ]
  },
  {
    "slug": "estimate-followup-study-oct28",
    "title": "What Happens After an HVAC Estimate Is Sent?",
    "summary": "A follow-up review that measures time to customer decision and the share with no documented next action.",
    "cluster": "Service evidence",
    "publishedAt": "2026-10-28",
    "finding": "A follow-up review that measures time to customer decision and the share with no documented next action.",
    "thumbnail": "/article-thumbnails/october-28/estimate-followup-study-oct28.svg",
    "sections": [
      {
        "heading": "Research question and scope",
        "paragraphs": [
          "This protocol examines estimate follow-up. It reports what one defined record can show in a fixed window and does not claim an industry rate or a causal effect."
        ]
      },
      {
        "heading": "Population and unit of analysis",
        "paragraphs": [
          "The unit is one sent estimate at delivery. Using one unit keeps linked events from being counted as independent successes or failures."
        ]
      },
      {
        "heading": "Definitions and measures",
        "paragraphs": [
          "The measure is the time to decision and the share without a next action. Publish the denominator and time window beside each count."
        ]
      },
      {
        "heading": "Evidence and data dictionary",
        "paragraphs": [
          "Collect the estimate, follow-up, and outcome. Keep missing, unavailable, and confirmed negative as separate states."
        ]
      },
      {
        "heading": "Sampling and collection",
        "paragraphs": [
          "The sample is estimates sent during one quarter. Record the observation date and exclude items already open before the window."
        ]
      },
      {
        "heading": "Analysis and reporting",
        "paragraphs": [
          "Report decision time by job type. Separate customer behavior from staff behavior whenever the evidence supports it."
        ]
      },
      {
        "heading": "Limitations and sources of error",
        "paragraphs": [
          "Limits include customers who never responded. State them beside the finding and avoid turning a small sample into a universal standard."
        ]
      },
      {
        "heading": "Review cadence and next action",
        "paragraphs": [
          "The next step is to set one earlier follow-up for large estimates. Re-test a later sample after the change."
        ]
      }
    ],
    "sources": [
      {
        "label": "Bureau of Labor Statistics",
        "url": "https://www.bls.gov/ooh/"
      },
      {
        "label": "U.S. Department of Energy",
        "url": "https://www.energy.gov/"
      },
      {
        "label": "EPA",
        "url": "https://www.epa.gov/"
      },
      {
        "label": "NIST",
        "url": "https://www.nist.gov/cyberframework"
      },
      {
        "label": "SBA",
        "url": "https://www.sba.gov/business-guide/manage-your-business"
      },
      {
        "label": "OSHA",
        "url": "https://www.osha.gov/"
      },
      {
        "label": "FTC",
        "url": "https://www.ftc.gov/business-guidance"
      },
      {
        "label": "GAO",
        "url": "https://www.gao.gov/"
      },
      {
        "label": "USA.gov",
        "url": "https://www.usa.gov/"
      },
      {
        "label": "CDC",
        "url": "https://www.cdc.gov/"
      }
    ]
  }
];
